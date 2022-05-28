import { Injectable } from '@angular/core';
import { combineLatest, forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  AuthHandler,
  AuthType,
  Menu,
  MenuEntity,
  UserInfo,
} from '../app-types';
import { AuthLocalHandler } from './auth-local-handler';
import { AuthOAuthHandler, TokenInfo } from './auth-oauth-handler';
import { MenuService } from './menu.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public authHandler: AuthHandler;
  public canActivateProtectedRoutes$: Observable<boolean>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private authLocal: AuthLocalHandler,
    private authOAuth: AuthOAuthHandler,
    private menuService: MenuService
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
    return this.authHandler.getUserInfo$.pipe(take(1));
  }

  getRootMenus(): Observable<Menu[]> {
    return this.filterMenus(this.menuService.getAll());
  }

  public hasMenu(menu?: Menu): Observable<boolean> {
    if (!menu) {
      return of(false);
    }
    return this.getUser().pipe(
      switchMap((user) => {
        const hasRoleForThisMenu = !!(
          !menu.roles ||
          user.roles?.some((userRole) => menu.roles.includes(userRole))
        );
        if (hasRoleForThisMenu && menu.enable) {
          return typeof menu.enable === 'function'
            ? menu.enable(user.roles, menu)
            : menu.enable;
        }
        return of(hasRoleForThisMenu);
      })
    );
  }

  public getSubMenus(menu: Menu): Observable<Menu[]> {
    if (menu._children) {
      return of(menu._children);
    }

    return this.filterMenus((<MenuEntity>menu).children || []).pipe(
      tap((submenus) => {
        menu._children = submenus;
      })
    );
  }

  private filterMenus(menus: Menu[]): Observable<Menu[]> {
    if (menus.length === 0) {
      return of([]);
    }
    return forkJoin(menus.map((m) => this.hasMenu(m))).pipe(
      map((enables) => {
        return menus.filter((_, index) => enables[index]);
      })
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
    this.menuService.reset();
    if (this.authHandler) {
      this.authHandler.logout();
    }
  }
}
