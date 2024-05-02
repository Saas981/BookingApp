import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { getAuth,signOut,User  } from 'firebase/auth';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isLoggedIn: boolean = false; // Track user's authentication status
  isSigningOut: boolean = false; // Track whether the user is signing out

  constructor(private router: Router) {
    // Check user's authentication status on component initialization
    const auth = getAuth();
    auth.onAuthStateChanged((user: User | null) => {
      this.isLoggedIn = !!user;
    });
  }


    // Method to sign out the user
    signOut(): void {
      // Set the flag to true when signing out
      this.isSigningOut = true;
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log('User signed out');
          // Remove the token from localStorage
          localStorage.removeItem('googleToken');
          setTimeout(() => {
            this.router.navigate(['/']);
            this.isSigningOut = false;
          }, 2000); // Wait for 2 seconds before redirecting
        })
        .catch((error) => {
          // An error happened.
          console.error('Sign-out error:', error);
          this.isSigningOut = false; // Reset the flag if sign-out fails
        });
    }
}
