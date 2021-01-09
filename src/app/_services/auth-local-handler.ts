import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { getLocalUrl } from 'src/utils';
import { AuthHandler, AuthType, UserInfo } from '../app-types';
import { TokenInfo } from './auth-oauth-handler';

@Injectable({
  providedIn: 'root',
})
export class AuthLocalHandler implements AuthHandler {
  private tokenInfo: TokenInfo;
  private userInfo: UserInfo;

  constructor(private http: HttpClient) {}

  getAuthType(): AuthType {
    return AuthType.Local;
  }

  getUserInfo(): Promise<UserInfo> {
    return Promise.resolve(this.userInfo);
  }

  getTokenInfo(): Promise<TokenInfo> {
    return Promise.resolve(this.tokenInfo);
  }

  isAuthenticated(): Promise<boolean> {
    return Promise.resolve(!!this.tokenInfo);
  }

  login(username: string, password: string): Promise<UserInfo> {
    // TODO: call your login url with provided username and password
    return this.http
      .get(getLocalUrl(`/assets/user.json`))
      .pipe(
        map((response) => {
          // TODO: convert to UserInfo from backend response
          this.userInfo = (username
            ? {
                ...response,
                ...{ name: username, accessToken: password },
              }
            : response) as UserInfo;
          this.tokenInfo = {
            accessToken: password,
          };
          return this.userInfo;
        })
      )
      .toPromise();
  }

  logout(): void | Promise<void> {
    // TODO: use corrent url to log out
    this.userInfo = null;
    this.tokenInfo = null;
    return this.http
      .get(getLocalUrl('/assets/user.json'))
      .pipe(
        map(() => {
          return;
        })
      )
      .toPromise();
  }
}
