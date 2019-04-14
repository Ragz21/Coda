import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { AudioDataService } from '../service/data/audio-data.service';
import { AudioContext } from 'angular-audio-context';

declare function start(): any;
declare function stop(): any;
declare const dataRetreaved: boolean;
declare const arrayBuffer: any;

export class LexData {
  constructor(
    requestContent: String,
    responseContent: String
  ) {

  }
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  audioControl: any;
  recording: boolean;
  request: boolean;
  response: boolean;
  allData: LexData;

  retreiveAllFiles() {
    this.lexService.retrieveAllFiles().subscribe(
      response => {
        this.allData = response;
        console.log(this.allData)
      }
    )
  }

  constructor(
    private lexService: AudioDataService,
    private router: Router,
  ) { }

  // global() {
  //   this.stopRecording().then(res => this.sleep());
  //   this.sleep().then(res => this.isDAtaFound());

  //}
  ngOnInit() {
    this.retreiveAllFiles();
    console.log(dataRetreaved)
    this.router.navigate([""]);
  }

  @ViewChildren("audio1") things: QueryList<any>


  ngAfterViewInit() {
    // this.things.changes.subscribe(
    //   t => {
    //     console.log("Yes. it's after view:" + arrayBuffer)
    //   }
    // )

  }


  initiateRecording() {
    start();
    this.recording = true;
  }
  stopRecording() {
    this.request = true;
    stop();
    console.log("done")
    this.recording = false;
    // this.sleep(1000);
    console.log("Array buffer in angular :", arrayBuffer)
    // console.log(dataRetreaved)
    // this.router.navigate([""]);
    // return new Promise((resolve, reject) => {
    //   console.log('f1');
    //   resolve();
    // });

    // this.ngOnInit();
  }

  sleep() {
    var currentTime = new Date().getTime();
    while (currentTime + 2000 >= new Date().getTime()) {
    }
    return new Promise((resolve, reject) => {
      console.log('f1');
      resolve();
    });
  }

  isDAtaFound() {
    console.log("Array buffer in angular :", arrayBuffer)
    console.log(dataRetreaved)
  }



}
