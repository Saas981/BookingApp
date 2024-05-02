import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet,Router } from '@angular/router';
import { NoteComponent } from './note/note.component';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { SigninComponent } from './signin/signin.component';
import { LandingComponent } from './landing/landing.component';
import { signOut,getAuth } from 'firebase/auth';
import { NavbarComponent } from './navbar/navbar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NoteComponent,RouterLink,RouterLinkActive,SigninComponent,LandingComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'BookingApp';
  constructor() {}

  ngOnInit(): void {
    initFlowbite();
  }


}
