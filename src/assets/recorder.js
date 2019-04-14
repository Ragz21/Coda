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
            console.log(arrayBuffer);
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost:8080/users", true);
            xhr.responseType = 'arraybuffer';
            xhr.send(arrayBuffer);
            // var resp = xhr.response;
            xhr.onload = function(e) {
                source = audioContext.createBufferSource();
                var audioData = xhr.response;
                console.log("audiodata",audioData)
                var blobData1 = new Blob([audioData], {type: 'audio/mpeg'});
                document.getElementById('audioResponse').src = window.URL.createObjectURL(blobData1); 
              };
            
            // var arrayBuffer = new ArrayBuffer(resp.length);
            // var bufferView = new Uint8Array(arrayBuffer);
            // for (i = 0; i < resp.length; i++) {
            // bufferView[i] = resp[i];
            // }
            // console.log(new ArrayBuffer(bufferView));
            // processConcatenatedFile( new ArrayBuffer(bufferView) )
            // playByteArray(resp)
           // window.location.reload()
        });
        });
    };
    reader.readAsArrayBuffer(blobData);
    }

})
.catch(function onError(error) {
    console.log(error.message);
});

// function grtAB

function start(){
    dataRetreaved = false;
    window.recorder.start()
}

async function stop(){
    window.recorder.stop();
    console.log("in js done")
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


function  sleep(miliseconds) {
    var currentTime = new Date().getTime();
 
    while (currentTime + miliseconds >= new Date().getTime()) {
    }
  }

  function base64toBlob(base64Data) {
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);
    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);
        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0 ; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, {type: 'audio/mpeg'});

}


// var context;    // Audio context
// var buf;  
// context = new AudioContext();
// function playByteArray(byteArray) {

//     var arrayBuffer = new ArrayBuffer(byteArray.length);
//     var bufferView = new Uint8Array(arrayBuffer);
//     for (i = 0; i < byteArray.length; i++) {
//       bufferView[i] = byteArray[i];
//     }
//     console.log(bufferView)
//     context.decodeAudioData(arrayBuffer, function(buffer) {
//         buf = buffer;
//         var playPromise = video.play();
//         if (playPromise !== undefined) {
//             playPromise.then(_ => {
//                 play();
//             })
//             .catch(error => {
//             // Auto-play was prevented
//             // Show paused UI.
//             });
//         }
//     });
// }

// // Play the loaded file
// function play() {
//     // Create a source node from the buffer
//     var source = context.createBufferSource();
//     source.buffer = buf;
//     // Connect to the final output node (the speakers)
//     source.connect(context.destination);
//     // Play immediately
//     source.start(0);
// }