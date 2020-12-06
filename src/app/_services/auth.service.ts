import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthHandler, AuthType, MenuEntity, UserInfo } from '../app-types';
import { AuthKeycloakHandler } from './auth-keycloak-handler';
import { AuthLocalHandler } from './auth-local-handler';
import { AuthOAuthHandler } from './auth-oauth-handler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authHandler: AuthHandler;

  constructor(
    private authKeycloak: AuthKeycloakHandler,
    private authLocal: AuthLocalHandler,
    private authOAuth: AuthOAuthHandler
  ) {
    this.setAuthType();
  }

  setAuthType(authType?: AuthType) {
    if (!authType) {
      authType = environment.authType;
    }

    switch (authType) {
      case AuthType.Local:
        this.authHandler = this.authLocal;
        break;

      case AuthType.Keycloak:
        this.authHandler = this.authKeycloak;
        break;

      case AuthType.CustomOAuth:
        this.authHandler = this.authOAuth;
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
    if (this.authHandler) {
      this.authHandler.logout();
    }
  }
}
