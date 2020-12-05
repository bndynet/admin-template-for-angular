import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthHandler, AuthType, MenuEntity, UserInfo } from '../app-types';
import { AuthKeycloakHandler } from './auth-keycloak-handler';
import { AuthOAuthHandler, TokenInfo } from './auth-oauth-handler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly KEY_USER = 'APP_USER';
  private readonly KEY_TOKEN = 'APP_TOKEN';

  // private oauth: OAuth;
  private userInfo: UserInfo;
  private tokenInfo: TokenInfo;

  public authHandler: AuthHandler;

  constructor(
    private http: HttpClient,
    private authKeycloak: AuthKeycloakHandler,
    private oauth: AuthOAuthHandler
  ) {
    switch (environment.authType) {
      case AuthType.Keycloak:
        this.authHandler = this.authKeycloak;
        break;

      case AuthType.CustomOAuth:
        this.authHandler = this.oauth;
        break;
    }
  }

  setAuthType(authType: AuthType) {
    switch (authType) {
      case AuthType.Keycloak:
        this.authHandler = this.authKeycloak;
        break;

      case AuthType.CustomOAuth:
        this.authHandler = this.oauth;
        break;
    }
  }

  isAuthenticated(): Observable<boolean> {
    return from(this.authHandler.isAuthenticated());
  }

  getUser(): Observable<UserInfo> {
    return from(this.authHandler.getUserInfo());
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
    this.tokenInfo = null;
    this.userInfo = null;
    sessionStorage.removeItem(this.KEY_TOKEN);
    sessionStorage.removeItem(this.KEY_USER);

    if (this.authHandler) {
      this.authHandler.logout();
    }
    // TODO: pass env param
    // return logout(this.http, null);
  }
}
