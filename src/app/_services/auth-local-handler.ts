import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { getLocalUrl } from 'src/utils';
import { AuthHandler, AuthType, UserInfo } from '../app-types';
import { TokenInfo } from './auth-oauth-handler';

const KEY_USER = 'app_user';
const KEY_TOKEN = 'app_token';
const KEY_BACK_URL = 'app_back_url';

@Injectable({
  providedIn: 'root',
})
export class AuthLocalHandler implements AuthHandler {
  private tokenInfo: TokenInfo;
  private userInfo: UserInfo;
  private isAuthenticated: boolean;
  private storage = localStorage;

  public getUserInfo$ = new ReplaySubject<UserInfo>(1);

  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneAuthSubject$ = new ReplaySubject<boolean>();
  public isDoneAuth$ = this.isDoneAuthSubject$.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    if (this.storage.getItem(KEY_TOKEN) && this.storage.getItem(KEY_USER)) {
      this.tokenInfo = JSON.parse(this.storage.getItem(KEY_TOKEN));
      this.userInfo = JSON.parse(this.storage.getItem(KEY_USER));
      this.isAuthenticated = true;
    }
    this.isAuthenticatedSubject$.next(this.isAuthenticated);
    this.getUserInfo$.next(this.userInfo);
    this.isDoneAuthSubject$.next(true);
  }

  init(): void {}

  getAuthType(): AuthType {
    return AuthType.Local;
  }

  getTokenInfo(): Promise<TokenInfo> {
    return Promise.resolve(this.tokenInfo);
  }

  login(
    targetUrl: string,
    username: string,
    password: string
  ): Observable<UserInfo> | void {
    if (!username && !password) {
      if (targetUrl) {
        this.storage.setItem(KEY_BACK_URL, targetUrl);
      }
      this.router.navigate(['/login']);
      return;
    }

    return this.http.get(getLocalUrl(`/assets/users.json`)).pipe(
      map((users: any[]) => {
        // TODO: convert to UserInfo from backend response
        this.userInfo = users.find((u) => u.username === username);
        if (!this.userInfo) {
          this.userInfo = { ...users[users.length - 1], name: username };
        }
        if (!this.userInfo.name) {
          this.userInfo.name = username;
        }

        this.tokenInfo = {
          accessToken: password,
        };
        this.storage.setItem(KEY_TOKEN, JSON.stringify(this.tokenInfo));
        this.storage.setItem(KEY_USER, JSON.stringify(this.userInfo));

        this.isAuthenticated = true;
        this.isAuthenticatedSubject$.next(this.isAuthenticated);
        this.isDoneAuthSubject$.next(true);
        this.getUserInfo$.next(this.userInfo);

        if (this.storage.getItem(KEY_BACK_URL) || targetUrl) {
          this.router.navigateByUrl(
            this.storage.getItem(KEY_BACK_URL) || targetUrl
          );
          this.storage.removeItem(KEY_BACK_URL);
        }
        return this.userInfo;
      })
    );
  }

  logout(): void {
    this.userInfo = null;
    this.tokenInfo = null;
    this.storage.removeItem(KEY_TOKEN);
    this.storage.removeItem(KEY_USER);
    this.isAuthenticated = false;
    this.isAuthenticatedSubject$.next(this.isAuthenticated);

    // TODO: use correct url to log out
    this.http
      .get(getLocalUrl('/assets/users.json'))
      .pipe(tap(() => this.router.navigate(['/logout'])))
      .subscribe();
  }
}
