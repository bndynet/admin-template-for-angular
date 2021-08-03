import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  OAuthErrorEvent,
  OAuthService,
  UserInfo as OUser,
} from 'angular-oauth2-oidc';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthHandler, AuthType, UserInfo } from '../app-types';

export interface OAuthConfig {
  clientId: string;
  authorizationUrl: string;
  realm?: string;
  clientSecret?: string;
  redirectUrl?: string;
  logoutUrl: string;
  accessTokenUrl?: string;
  scope?: string;
  userProfileUrl?: string;
  keyNameForClientID?: string;
  keyNameForClientSecret?: string;
  keyNameForScope?: string;
  keyNameForState?: string;
  keyNameForCode?: string;
  keyNameForRedirectUrl?: string;
  keyNameForAccessToken?: string;
  keyNameForTokenType?: string;
  keyNameForExpiresIn?: string;
}

export interface TokenInfo {
  tokenType?: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthOAuthHandler implements AuthHandler {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneAuthSubject$ = new ReplaySubject<boolean>();
  public isDoneAuth$ = this.isDoneAuthSubject$.asObservable();

  private getUserInfoSubject$ = new BehaviorSubject<UserInfo>(null);
  public getUserInfo$ = this.getUserInfoSubject$.asObservable();

  constructor(private router: Router, private oauthService: OAuthService) {}

  init(): void {
    this.oauthService.configure(environment.oauth);
    this.oauthService
      .loadDiscoveryDocument()
      .then(() => this.oauthService.tryLogin())
      .then(() => {
        // https://github.com/jeroenheijmans/sample-angular-oauth2-oidc-with-auth-guards/blob/66ae28bab9/src/app/core/auth.service.ts
        if (this.oauthService.hasValidAccessToken()) {
          return Promise.resolve();
        }
      })
      .then(() => this.isDoneAuthSubject$.next(true))
      .catch(() => this.isDoneAuthSubject$.next(true));

    // Print error log
    this.oauthService.events.subscribe((event) => {
      if (event instanceof OAuthErrorEvent) {
        console.error('OAuthErrorEvent Object:', event);
      } else {
        console.warn('OAuthEvent Object:', event);
      }
    });

    this.oauthService.events.subscribe((_) => {
      this.isAuthenticatedSubject$.next(
        this.oauthService.hasValidAccessToken()
      );
    });

    // Automatically load user profile
    this.oauthService.events
      .pipe(filter((e) => e.type === 'token_received'))
      .subscribe((_) => {
        this.oauthService.loadUserProfile().then((user: OUser) => {
          // TODO: convert user info
          this.getUserInfoSubject$.next({
            name: user['name'],
          });
        });
      });

    // this.oauthService.setupAutomaticSilentRefresh();
  }

  getAuthType(): AuthType {
    return AuthType.OAuth;
  }

  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(
      this.oauthService.hasValidIdToken() &&
        this.oauthService.hasValidAccessToken()
    );
  }

  getToken(): Promise<TokenInfo> {
    return Promise.resolve({
      accessToken: this.oauthService.getAccessToken(),
    });
  }

  login(targetUrl?: string): void {
    this.oauthService.initLoginFlow(targetUrl || this.router.url);
  }

  logout(): void {
    this.oauthService.logOut();
  }

  getTokenInfo(): Promise<TokenInfo> {
    let token: TokenInfo = null;
    if (this.oauthService.getAccessToken()) {
      token = {
        accessToken: this.oauthService.getAccessToken(),
        expiresIn: this.oauthService.getAccessTokenExpiration(),
      };
    }
    return Promise.resolve(token);
  }
}
