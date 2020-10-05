import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { UserEntity } from '../app-types';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userInfo: UserEntity;

  constructor(
    private http: HttpClient,
  ) { }

  getAuthorizationToken(): string {
    return 'token';
  }

  getUserInfo(): Observable<UserEntity> {
    if (!this.userInfo) {
      return this.http.get<UserEntity>(`/assets/user.json`);
    } else {
      return of(this.userInfo);
    }
  }

  logout(): Observable<{}> {
    // TODO:
    return of('').pipe(delay(3000));
  }
}
