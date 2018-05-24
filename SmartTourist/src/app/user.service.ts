import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';
import { myConfig } from './user.config';
import { HttpClient } from '@angular/common/http';

declare var Auth0Lock: any;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  profile: any;
  user = {"name": "", "user_id": ""}
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

  constructor(private _http: HttpClient, public router: Router) { 
    this.lock.on('authenticated', (authResult) => {
      console.log(authResult);
      this.setSession(authResult);
      this.profile = authResult.idTokenPayload;
      this.user.name = this.profile.name;
      this.user.user_id = this.profile.sub;
      this.addUser();
      this.router.navigate(['/home']); 
    });
    
  }
  public addUser(){
    let obs = this._http.get('/users/' + this.user.user_id);
    obs.subscribe(data => {
      if(data['user'] === null){
        let observable = this._http.post('/users', this.user);
        observable.subscribe(datas => {
        })        
      }
    })
  };

  public addPlace(userId, placeId){
    return this._http.put('/users/' + userId, {place: placeId})
  }

  public getInfo(userId){
    return this._http.get('/users/'+ userId);
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
