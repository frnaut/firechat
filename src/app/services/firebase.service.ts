import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Mensaje } from '../models/mesaje.interface';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  user: any = {};

  constructor( private fs: AngularFirestore, private fbAuth: AngularFireAuth ) {
    
    this.fbAuth.authState.subscribe( usuario =>{

      if(!usuario){
        return;
      }

      
      this.user.nombre = usuario.displayName;
      this.user.uid = usuario.uid;  
    });

  }

  getMesanje(): Observable<any>{
    return this.fs.collection('chats', ref => ref.orderBy('send', 'desc').limit(10)).valueChanges();
  }

  postMensaje(text: string){
    let mensaje: Mensaje = {
      mensaje :  text,
      nombre  :  this.user.nombre,
      uid     :  this.user.uid,
      send    :  Date.now()
    }

    return this.fs.collection('chats').add(mensaje);
  }

  login(account: string){

    if(account === 'google'){
      return this.fbAuth.signInWithPopup(new auth.GoogleAuthProvider());
    }
  }

  logout(){
    return this.fbAuth.signOut();
  }

}
