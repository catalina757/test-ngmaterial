import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import * as auth0 from'auth0-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: 'your id',
    domain: 'your domain',
    responseType: 'token',
    redirectUri: 'http://localhost:4200/',
    scope: 'openid'
  });

  accessToken: string;
  expiresAt: any;

  constructor(public router: Router) {
    this.accessToken ='';
  }

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.accessToken = authResult.accessToken;
        // @ts-ignore
        this.expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
        this.router.navigate(['/dashboard']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    this.accessToken = '';
    this.expiresAt = null;
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    return new Date().getTime() < this.expiresAt;
  }
}