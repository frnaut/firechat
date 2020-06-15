import { Component, OnInit } from '@angular/core';
import { FirebaseService } from './services/firebase.service';
import { User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'firechat';

  constructor(public fbService: FirebaseService){
    
    
  }

  ngOnInit(): void {
    
  }

  login( account: string ){
    this.fbService.login(account).then((data)=>{
      // console.log(data);
    })
    .catch((data)=>{
      // console.log(data);
    })
  }

  logout(){
    this.fbService.logout();
    
  }
}
