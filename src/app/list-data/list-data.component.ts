import { Component, OnInit } from '@angular/core';
import { AudioDataService } from '../service/data/audio-data.service';
import { Router } from '@angular/router';
import { LexData } from '../index/index.component';

@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css']
})
export class ListDataComponent implements OnInit {

  allData : LexData;
  retreiveAllFiles(){
    this.lexService.retrieveAllFiles().subscribe(
      response =>{
        this.allData = response;
      }
    )
  }

  constructor(
    private lexService : AudioDataService,
    private router : Router
  ) { }

  ngOnInit() {
    this.retreiveAllFiles();
  }

}
