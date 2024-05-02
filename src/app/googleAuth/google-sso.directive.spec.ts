import { GoogleSsoDirective } from './google-sso.directive';
import { Router } from '@angular/router';
describe('GoogleSsoDirective', () => {
  it('should create an instance', () => {
    const directive = new GoogleSsoDirective(new Router);
    expect(directive).toBeTruthy();
  });
});
