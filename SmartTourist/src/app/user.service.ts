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
    scope: 'openid'
  })

  constructor(public router: Router) { }

  public login(): void {
    this.auth0.authorize();
  }
}
