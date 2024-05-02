
import {  Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard'; // Import the AuthGuard

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // Protect dashboard route with AuthGuard
];