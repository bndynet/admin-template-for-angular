import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuEntity, UserEntity } from '../app-types';
import { OAuth } from './oauth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly KEY_USER = 'APP_USER';
  private readonly KEY_TOKEN = 'APP_TOKEN';

  private oauth: OAuth;
  private userInfo: UserEntity;
  private accessToken: string;

  constructor(private http: HttpClient) {}

  enableOAuth(oauthInstance: OAuth): void {
    this.oauth = oauthInstance;
  }

  getAccessToken(): string {
    if (this.accessToken) {
      return this.accessToken;
    }

    if (sessionStorage.getItem(this.KEY_TOKEN)) {
      this.accessToken = sessionStorage.getItem(this.KEY_TOKEN);
      return this.accessToken;
    }

    return null;
  }

  setToken(accessToken: string): void {
    sessionStorage.setItem(this.KEY_TOKEN, accessToken);
  }

  getUser(): Observable<UserEntity> {
    if (this.userInfo) {
      return of(this.userInfo);
    }

    if (sessionStorage.getItem(this.KEY_USER)) {
      this.userInfo = JSON.parse(sessionStorage.getItem(this.KEY_USER));
      return of(this.userInfo);
    }

    return of();
  }

  setUser(user: UserEntity): void {
    sessionStorage.setItem(this.KEY_USER, JSON.stringify(user));
  }

  getMenu(menu: MenuEntity[]): Observable<MenuEntity[]> {
    const filterSubmenu = (
      menuItem: MenuEntity,
      userRoles: string[]
    ): MenuEntity[] => {
      const result: MenuEntity[] = [];
      if (menuItem.children) {
        menuItem.children.forEach((submenu) => {
          if (
            !submenu.roles ||
            !userRoles ||
            submenu.roles.filter((role) => userRoles.includes(role)).length > 0
          ) {
            filterSubmenu(submenu, userRoles);
            result.push(submenu);
          }
        });
      }
      menuItem.children = result;
      return result;
    };

    return this.getUser().pipe(
      map((user) =>
        menu.filter((m) => {
          const hasRole =
            !m.roles ||
            (m.roles &&
              user.roles &&
              m.roles.filter((role) => user.roles.includes(role)).length > 0);

          if (hasRole) {
            filterSubmenu(m, user.roles);
            return true;
          }
          return hasRole;
        })
      )
    );
  }

  logout(): void {
    this.accessToken = null;
    this.userInfo = null;
    sessionStorage.removeItem(this.KEY_TOKEN);
    sessionStorage.removeItem(this.KEY_USER);

    if (this.oauth) {
      this.oauth.logout();
    }
    // TODO: pass env param
    // return logout(this.http, null);
  }
}
