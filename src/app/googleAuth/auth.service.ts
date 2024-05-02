import { Injectable } from '@angular/core';
import { getAuth, User } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    const auth = getAuth();
    return !!auth.currentUser;
  }

  // Method to redirect to the signin page if the user is not authenticated
  redirectToSigninIfNotAuthenticated(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/signin']);
    }
  }
}
