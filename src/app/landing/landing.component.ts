import { Component } from '@angular/core';
import { GoogleSsoDirective } from '../google-sso.directive';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [GoogleSsoDirective],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
