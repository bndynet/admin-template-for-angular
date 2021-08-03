import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthHandler, AuthType, MenuEntity, UserInfo } from '../app-types';
import { AuthLocalHandler } from './auth-local-handler';
import { AuthOAuthHandler, TokenInfo } from './auth-oauth-handler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authHandler: AuthHandler;
  public canActivateProtectedRoutes$: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authLocal: AuthLocalHandler,
    private authOAuth: AuthOAuthHandler
  ) {
    this.setAuthType();
  }

  init(): void {
    this.authHandler.init();
  }

  isAuthenticated(): Observable<boolean> {
    return this.authHandler.isAuthenticated$;
  }

  isDoneAuth(): Observable<boolean> {
    return this.authHandler.isDoneAuth$;
  }

  setAuthType(authType?: AuthType) {
    if (!authType) {
      authType = environment.authType;
    }

    switch (authType) {
      case AuthType.Local:
        this.authHandler = this.authLocal;
        break;

      case AuthType.OAuth:
        this.authHandler = this.authOAuth;
        break;
    }

    this.isAuthenticated$ = this.authHandler.isAuthenticated$;

    this.canActivateProtectedRoutes$ = combineLatest([
      this.authHandler.isAuthenticated$,
      this.authHandler.isDoneAuth$,
    ]).pipe(map((values) => values.every((b) => b)));
  }

  getAuthType(): AuthType {
    return environment.authType;
  }

  getTokenInfo(): Promise<TokenInfo> {
    if (this.authHandler) {
      return this.authHandler.getTokenInfo();
    } else {
      return Promise.resolve(null);
    }
  }

  getUser(): Observable<UserInfo> {
    return this.authHandler.getUserInfo$;
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

  login(
    targetUrl?: string,
    username?: string,
    password?: string
  ): void | Observable<UserInfo> {
    return this.authHandler.login(targetUrl, username, password);
  }

  logout(): void {
    if (this.authHandler) {
      this.authHandler.logout();
    }
  }
}
