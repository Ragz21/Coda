window.AudioContext = window.AudioContext ||window.webkitAudioContext;
audioContext = new AudioContext();
var arrayBuffer;
var dataRetreaved = false; 
navigator.mediaDevices.getUserMedia({audio:true})
.then(function onSuccess(stream) {
    var recorder = window.recorder = new MediaRecorder(stream);
    var data = [];
    recorder.ondataavailable = function(e) {
    data.push(e.data);
    };
    recorder.onerror = function(e) {
    throw e.error || new Error(e.name);       }
    recorder.onstart = function(e) {
    data = [];
    }
    recorder.onstop = function(e) {
    var blobData = new Blob(data, {type: 'audio/x-l16'});
    document.getElementById('audio').src = window.URL.createObjectURL(blobData);
    var reader = new FileReader();
    reader.onload = function() {
        audioContext.decodeAudioData(reader.result, function(buffer) {
        reSample(buffer, 16000, function(newBuffer){
            arrayBuffer = convertFloat32ToInt16(newBuffer.getChannelData(0));
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:8001/users", true);
            xhr.responseType = 'arraybuffer';
            xhr.send(arrayBuffer);
            xhr.onload = function(e) {
                var audioData = xhr.response;
                var blobResponseData = new Blob([audioData], {type: 'audio/mpeg'});
                document.getElementById('audioResponse').src = window.URL.createObjectURL(blobResponseData); 
              };
            
        });
        });
    };
    reader.readAsArrayBuffer(blobData);
    }

})
.catch(function onError(error) {
    console.log(error.message);
});

function start(){
    dataRetreaved = false;
    window.recorder.start();
}

async function stop(){
    window.recorder.stop();
}

function reSample(audioBuffer, targetSampleRate, onComplete) {
    var channel = audioBuffer.numberOfChannels;
    var samples = audioBuffer.length * targetSampleRate / audioBuffer.sampleRate;
    var offlineContext = new OfflineAudioContext(channel, samples, targetSampleRate);
    var bufferSource = offlineContext.createBufferSource();
    bufferSource.buffer = audioBuffer;
    bufferSource.connect(offlineContext.destination);
    bufferSource.start(0);
    offlineContext.startRendering().then(function(renderedBuffer){
        onComplete(renderedBuffer);
})
}

function convertFloat32ToInt16(buffer) {
    var l = buffer.length;
    var buf = new Int16Array(l);
    while (l--) {
        buf[l] = Math.min(1, buffer[l]) * 0x7FFF;
    }
    return buf.buffer;
}

