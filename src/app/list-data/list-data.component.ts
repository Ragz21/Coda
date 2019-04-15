import { Component, OnInit } from '@angular/core';
import { AudioDataService } from '../service/data/audio-data.service';
import { Router } from '@angular/router';
import { LexData } from '../index/index.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css']
})
export class ListDataComponent implements OnInit {

  allData : LexData[];
  retreiveAllFiles(){
    this.lexService.retrieveAllFiles().subscribe(
      response =>{
        this.allData = response;
      }
    )
  }

  constructor(
    private lexService : AudioDataService,
    private router : Router,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.retreiveAllFiles();

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
