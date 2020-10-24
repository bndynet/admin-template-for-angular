import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { login, logout } from 'src/config';
import { UserEntity } from '../app-types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly KEY_USER = 'USER';

  private userInfo: UserEntity;

  constructor(private http: HttpClient) {}

  getAuthorizationToken(): string {
    return this.userInfo ? this.userInfo.token : '';
  }

  getUserInfo(): Observable<UserEntity> {
    if (!this.userInfo) {
      return login(this.http);
    } else {
      return of(this.userInfo);
    }
  }

  login(username: string, password: string): Observable<UserEntity> {
    // TODO: pass env param
    return login(this.http, username, password).pipe(
      map((user: UserEntity) => {
        sessionStorage.setItem(this.KEY_USER, JSON.stringify(user));
        this.userInfo = user;
        return this.userInfo;
      })
    );
  }

  logout(): Observable<{}> {
    this.userInfo = null;
    sessionStorage.removeItem(this.KEY_USER);
    // TODO: pass env param
    return logout(this.http, null);
  }
}
