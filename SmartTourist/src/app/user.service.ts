import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { myConfig } from './user.config';

declare var Auth0Lock: any;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  profile: any;
  lock = new Auth0Lock('huPUT41yTZj0urj70vsUB5UEvj26uus5', 'smarttourist.auth0.com', 
  {
    theme: {
      logo: "https://images.vexels.com/media/users/3/144290/isolated/preview/c48f8a4d4694861b7961c16e0ff565de-arrow-wing-travel-logo-by-vexels.png",
      primaryColor: "#6db869",
      labeledSubmitButton: false
    },
    autoclose: true,
    languageDictionary: {
        title: "SmartTourist",
        loginLabel: "Sign In",
        signUpLabel: "Create",
        signUpSubmitLabel: "Create",
        emailInputPlaceholder: "your email address",
        signUpTerms: "I agree to the <a href='/terms' target='_new'>terms of service</a> and <a href='/privacy' target='_new'>privacy policy</a>."
    },
    auth: {
        redirectUrl: 'http://localhost:8000/callback', 
        responseType: 'id_token token',
        params: {
            audience: 'https://smarttourist.auth0.com/userinfo',
            scope: 'openid profile email'
        }
      }
  });

  constructor(public router: Router) { 
    this.lock.on('authenticated', (authResult) => {
      console.log(authResult);
      this.setSession(authResult);
      this.profile = authResult.idTokenPayload;
      this.router.navigate(['/home']); 
    });
    
  }

  public login() {
    this.lock.show();
  };

  public getProfile(){
    return this.profile;
  }

  public logout() {
      // Remove token from localStorage
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('access_token');
      this.router.navigate(['/']);
  };

  private setSession(authResult): void {

    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
