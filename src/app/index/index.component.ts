import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { AudioDataService } from '../service/data/audio-data.service';
import { DomSanitizer } from '@angular/platform-browser';

declare function start(): any;
declare function stop(): any;
declare const dataRetreaved: boolean;
declare const arrayBuffer: any;

export class LexData {
  constructor(
    requestContent: any,
    responseContent: any
  ) {
  }
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})

export class IndexComponent implements OnInit {
  audioControl: any;
  recording: boolean;
  request: boolean;
  response: boolean;
  allData : LexData[];
  private page : number= 0;
  private totalPages:Array<number>;
  private size:number = 3;

  retreiveAllFiles(){
    this.lexService.retrieveAllFiles(this.page, this.size).subscribe(
      response =>{
        this.allData = response['content'];
        this.totalPages = new Array(response['totalPages']);
      },
      (error) => {
        console.log(error.error.message);
      }
    )
  }

  setPage(i ,event:any){
    event.preventDefault();
    this.page=i;
    this.retreiveAllFiles()
  }

  constructor(
    private lexService: AudioDataService,
    private router: Router,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.router.navigate([""]);
  }

  initiateRecording() {
    start();
    this.recording = true;
  }
  
  stopRecording() {
    this.request = true;
    stop();
    this.recording = false;
    this.retreiveAllFiles();//used at stoprecording to avoid refresh required when used in ngoninit
    this.router.navigate([""]);
  }

  requestData(data : any){
    var url = "data:audio/wav;base64," + data.requestContent;
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  
  responseData(data: any){
    var url = "data:audio/wav;base64," + data.responseContent;
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }
  
}
