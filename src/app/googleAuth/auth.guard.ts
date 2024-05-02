// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const googleToken = localStorage.getItem('googleToken');

    if (this.authService.isAuthenticated() || googleToken) {
      return true;
    } else {
      this.router.navigate(['/signin']); // Redirect to signin page if not authenticated
      return false;
    }
  }
}
