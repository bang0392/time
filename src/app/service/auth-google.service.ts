import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService, OAuthEvent } from 'angular-oauth2-oidc'
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthGoogleService {

  constructor(private oauthService: OAuthService, private cookieService: CookieService) {
    this.initLogin();
    this.oauthService.events.subscribe((event: OAuthEvent) => {
      if (event.type === 'token_received') {
        // Lưu email vào sessionStorage
        const claims = this.oauthService.getIdentityClaims();
        if (claims && claims['email']) {
          sessionStorage.setItem('userEmail', claims['email']);
        }
      }
    });

  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '965716208913-nbr781sshpfk6um54melkdedctlfh5tp.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/notification',
      scope: 'openid profile email',
    }

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login() {
    this.oauthService.initLoginFlow();
  }

  logout() {
    this.oauthService.logOut();
    sessionStorage.clear();
    localStorage.clear();
    this.cookieService.deleteAll();
  }

  getProfile() {
    return this.oauthService.getIdentityClaims();
  }

}
