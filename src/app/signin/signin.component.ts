// signin.component.ts

import { Component } from '@angular/core';
import { GoogleSsoDirective } from '../google-sso.directive';
import { getAuth } from '@angular/fire/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

   auth = getAuth()
  signInWithGoogle() {
    console.log("CLICKDED")
    let cred = signInWithPopup(this.auth,new GoogleAuthProvider());
    console.log("CREDS ",cred)
  }

 
}
