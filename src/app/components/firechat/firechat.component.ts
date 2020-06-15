import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Mensaje } from '../../models/mesaje.interface';


@Component({
  selector: 'app-firechat',
  templateUrl: './firechat.component.html',
  styleUrls: ['./firechat.component.css']
})
export class FirechatComponent implements OnInit {


  chats: Mensaje[];
  text: string;
  elementoHTML;

  constructor(public firebase: FirebaseService) {
   
    

  }


  ngOnInit(): void {
    this.get()
  }

  get(){
    this.firebase.getMesanje().subscribe( (data: Mensaje[]) => {

      this.chats =[];

      data.forEach((chat)=>{
        this.chats.unshift(chat)
      })
    });
  }

  post(){

    if(this.text.length > 0){
      this.firebase.postMensaje(this.text)
      this.text = "";
    }

  }
}
