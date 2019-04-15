import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { AudioDataService } from '../service/data/audio-data.service';

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
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  audioControl: any;
  recording: boolean;
  request: boolean;
  response: boolean;

  constructor(
    private lexService: AudioDataService,
    private router: Router,
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
  }
}
