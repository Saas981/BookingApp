import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { GoogleSsoDirective } from '../googleAuth/google-sso.directive';

@Component({
  standalone: true,
  selector: 'app-signin',
  imports: [GoogleSsoDirective],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent{

 
}
