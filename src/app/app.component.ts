import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet,Router } from '@angular/router';
import { NoteComponent } from './note/note.component';
import { OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { SigninComponent } from './signin/signin.component';
import { LandingComponent } from './landing/landing.component';
import { signOut,getAuth } from 'firebase/auth';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NoteComponent,RouterLink,RouterLinkActive,SigninComponent,LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'BookingApp';
  constructor(private router: Router) {}

  ngOnInit(): void {
    initFlowbite();
  }

    // Method to sign out the user
    signOut(){
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log('User signed out');
          this.router.navigate(['/']);

        })
        .catch((error) => {
          // An error happened.
          console.error('Sign-out error:', error);
        });
    }
}
