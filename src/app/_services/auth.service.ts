import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { login, logout } from 'src/config';
import { MenuEntity, UserEntity } from '../app-types';

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
      const session = sessionStorage.getItem(this.KEY_USER);
      if (session) {
        this.userInfo = JSON.parse(session);
        return of(this.userInfo);
      }
      return login(this.http);
    } else {
      return of(this.userInfo);
    }
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

    return this.getUserInfo().pipe(
      map((user: UserEntity) => {
        return menu.filter((m) => {
          const hasRole =
            !m.roles ||
            (m.roles &&
              user.roles &&
              m.roles.filter((role) => this.userInfo.roles.includes(role))
                .length > 0);

          if (hasRole) {
            filterSubmenu(m, this.userInfo.roles);
            return true;
          }
          return hasRole;
        });
      })
    );
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
