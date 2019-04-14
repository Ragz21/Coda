import { Component, OnInit } from '@angular/core';

export class Chat{
  constructor(
    public from_user : string,
    public from_server : string,
  ){
  }
}


@Component({
  selector: 'app-chatspace',
  templateUrl: './chatspace.component.html',
  styleUrls: ['./chatspace.component.css']
})
export class ChatspaceComponent implements OnInit {

  Chats = [
    new Chat("how is the weather","the temperature is 45C"),
    new Chat("Should i take an umbrela", "NO!"),
  ]

  constructor() { }

  ngOnInit() {
  }

  

}
