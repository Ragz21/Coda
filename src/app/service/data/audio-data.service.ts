import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LexData } from 'src/app/index/index.component';

@Injectable({
  providedIn: 'root'
})
export class AudioDataService {

  constructor(
    private http : HttpClient,
  ) { }

  retrieveAllFiles(){
    return this.http.get<LexData[]>(`http://localhost:8080/users`);
  }
}
