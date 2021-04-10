import { Injectable } from '@angular/core';
import {
  OAuthErrorEvent,
  OAuthService,
  UserInfo as OUser,
} from 'angular-oauth2-oidc';
import * as Cookies from 'js-cookie';
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

const KEY_TOKEN = 'OAUTH_TOKEN';

@Injectable({
  providedIn: 'root',
})
export class AuthOAuthHandler implements AuthHandler {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new ReplaySubject<boolean>();
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  private getUserInfoSubject$ = new BehaviorSubject<UserInfo>(null);
  public getUserInfo$ = this.getUserInfoSubject$.asObservable();

  private tokenInfo: TokenInfo;
  private userInfo: UserInfo;
  private config: OAuthConfig;
  private loadUserPromise: Promise<OUser>;

  constructor(private oauthService: OAuthService) {}

  init(): void {
    this.oauthService.configure(environment.oauth);
    this.oauthService.loadDiscoveryDocumentAndTryLogin();

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
        console.debug('loading user profile.......');
        this.oauthService.loadUserProfile().then((user: OUser) => {
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

  setUser(user: UserInfo): void {
    this.userInfo = user;
  }

  getToken(): Promise<TokenInfo> {
    return Promise.resolve({
      accessToken: this.oauthService.getAccessToken(),
    });
  }

  getUserInfo(): Promise<UserInfo> {
    let user: UserInfo = null;
    const claims = this.oauthService.getIdentityClaims();
    if (claims) {
      user = {
        name: claims['name'],
      };
    } else {
      if (!this.loadUserPromise && this.oauthService.hasValidAccessToken()) {
        this.loadUserPromise = this.oauthService.loadUserProfile();
      }

      if (this.loadUserPromise) {
        return this.loadUserPromise.then((userInfo: OUser) => {
          debugger;
          return {
            name: userInfo['name'],
          };
        });
      }
    }
    return Promise.resolve(user);
  }

  login(): void {
    this.oauthService.initLoginFlow();
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

  setToken(token: TokenInfo): void {
    this.tokenInfo = token;
    if (this.tokenInfo.expiresIn) {
      const expireDate = new Date().getTime() + 1000 * this.tokenInfo.expiresIn;
      Cookies.set(KEY_TOKEN, this.tokenInfo.accessToken, {
        expires: expireDate,
      });
    }
  }
}
