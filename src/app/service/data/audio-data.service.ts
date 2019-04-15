import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LexData } from 'src/app/index/index.component';

@Injectable({
  providedIn: 'root'
})
export class AudioDataService {
  private url = 'http://localhost:8001'

  constructor(
    private http : HttpClient,
  ) { }

  retrieveAllFiles(page :number){
    return this.http.get(this.url+'/users'+'?page='+page);
  }
}
