import { Injectable } from '@angular/core';
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
}

export interface TokenInfo {
  tokenType?: string;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
}

const KEY_TOKEN = 'OAUTH_TOKEN';
const KEY_HTTP_HEADER_CONTENTTYPE = 'Content-Type';
const KEY_HTTP_HEADER_AUTHORIZATION = 'Authorization';

@Injectable({
  providedIn: 'root',
})
export class AuthOAuthHandler implements AuthHandler {
  private tokenInfo: TokenInfo;
  private userInfo: UserInfo;
  private config: OAuthConfig;

  constructor() {
    if (sessionStorage.getItem(KEY_TOKEN)) {
      this.tokenInfo = JSON.parse(
        sessionStorage.getItem(KEY_TOKEN)
      ) as TokenInfo;
    }

    this.config = {
      ...{
        keyNameForClientID: 'client_id',
        keyNameForClientSecret: 'client_secret',
        keyNameForRedirectUrl: 'redirect_uri',
        keyNameForCode: 'code',
        keyNameForScope: 'scope',
        keyNameForState: 'state',
        keyNameForAccessToken: 'access_token',
        keyNameForTokenType: 'token_type',
      },
      ...environment.oauth,
    };
  }

  getAuthType(): AuthType {
    return AuthType.CustomOAuth;
  }

  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.tokenInfo);
  }

  checkAuth(): Promise<TokenInfo> {
    const error = this.getErrorFromUrl();
    if (error) {
      return Promise.reject(decodeURIComponent(error));
    }

    if (this.isAuthorizating()) {
      return this.getToken();
    }

    if (!this.isAuthenticated()) {
      window.location.href = this.getLoginUrl();
      return Promise.reject(null);
    }

    return Promise.reject(null);
  }

  setUser(user: UserInfo): void {
    this.userInfo = user;
  }

  getToken(): Promise<TokenInfo> {
    if (this.tokenInfo) {
      return Promise.resolve(this.tokenInfo);
    }

    const search = this.getCurrentUrlSearch();

    const accessToken = search[this.config.keyNameForAccessToken];
    if (accessToken) {
      this.tokenInfo = {
        accessToken,
        tokenType: 'bearer',
      };
      this.setToken(this.tokenInfo);
      return Promise.resolve(this.tokenInfo);
    }

    const code = search[this.config.keyNameForCode];
    const state = search[this.config.keyNameForState];

    if (!code) {
      return Promise.reject('No code response.');
    }
    if (state !== this.getState()) {
      return Promise.reject('Invalid state.');
    }

    const requestBody = {};
    requestBody[this.config.keyNameForClientID] = this.config.clientId;
    requestBody[this.config.keyNameForClientSecret] = this.config.clientSecret;
    requestBody[this.config.keyNameForCode] = code;
    requestBody[this.config.keyNameForRedirectUrl] = this.config.redirectUrl;
    requestBody[this.config.keyNameForState] = state;

    if (this.config.scope) {
      requestBody[this.config.keyNameForScope] = this.config.scope;
    }

    return fetch(this.config.accessTokenUrl, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    }).then((response: any) => {
      const responseJson = response.json();
      const token: TokenInfo = {
        tokenType: responseJson[this.config.keyNameForTokenType],
        accessToken: responseJson[this.config.keyNameForAccessToken],
      };
      this.setToken(token);
      return token;
    });
  }

  getUserInfo(): Promise<UserInfo> {
    if (this.userInfo) {
      return Promise.resolve(this.userInfo);
    }

    const headers: { [key: string]: string } = {};

    headers[KEY_HTTP_HEADER_CONTENTTYPE] = 'application/json';
    headers[
      KEY_HTTP_HEADER_AUTHORIZATION
    ] = `${this.tokenInfo.tokenType} ${this.tokenInfo.accessToken}`;

    return fetch(this.config.userProfileUrl, {
      method: 'GET',
      headers,
    }).then((response) => {
      // TODO: here to convert user info
      const json: any = response.json();
      return { ...json, avatar: json.avatar_url };
    });
  }

  login(username: string, password: string): Promise<UserInfo> {
    return Promise.reject('TODO');
  }

  logout(): void {
    sessionStorage.removeItem(KEY_TOKEN);
    this.tokenInfo = null;
    window.location.href = this.config.logoutUrl;
  }

  getTokenInfo(): Promise<TokenInfo> {
    return Promise.resolve(JSON.parse(sessionStorage.getItem(KEY_TOKEN)));
  }

  setToken(token: TokenInfo): void {
    this.tokenInfo = token;
  }

  private isAuthorizating(): boolean {
    return (
      !!this.getCurrentUrlSearch()[this.config.keyNameForCode] ||
      !!this.getCurrentUrlSearch()[this.config.keyNameForAccessToken]
    );
  }

  private getErrorFromUrl(): string {
    return (this.getCurrentUrlSearch() as any).error;
  }

  private getState(): string {
    return sessionStorage.getItem(this.config.keyNameForState);
  }

  private getLoginUrl(): string {
    const state = '12311';
    sessionStorage.setItem(this.config.keyNameForState, state);
    let url = `${this.config.authorizationUrl}`;
    url += `${this.config.authorizationUrl.indexOf('?') ? '&' : '?'}${
      this.config.keyNameForClientID
    }=${this.config.clientId}`;
    url += `&${this.config.keyNameForClientSecret}=${this.config.clientSecret}`;
    url += `&${this.config.keyNameForRedirectUrl}=${this.config.redirectUrl}`;
    url += `&${this.config.keyNameForState}=${state}`;

    if (this.config.scope) {
      url += `&${this.config.keyNameForScope}=${this.config.scope}`;
    }
    return url;
  }

  private getCurrentUrlSearch(): object {
    const locationSearch = window.location.search;
    const search = {};
    if (locationSearch && locationSearch.startsWith('?')) {
      locationSearch
        .substr(1)
        .split('&')
        .map((kv) => {
          const arr = kv.split('=');
          search[arr[0]] = arr.length > 1 ? arr[1] : '';
        });
    }
    return search;
  }
}
