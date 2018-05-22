import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth0 = new auth0.WebAuth({
    clientID: 'huPUT41yTZj0urj70vsUB5UEvj26uus5',
    domain: 'smarttourist.auth0.com',
    responseType: 'token id_token',
    audience: 'https://smarttourist.auth0.com/userinfo',
    redirectUri: 'http://localhost:8000/callback',
    scope: 'openid profile'
  })

  constructor(public router: Router) { }

  public login(): void {
    console.log("made it to the user service")
    this.auth0.authorize();

  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/home']);
      } else if (err) {
        this.router.navigate(['/home']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {

    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

  public logout(): void {

    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');

    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}
