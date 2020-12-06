import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';
import { AuthHandler, AuthType, UserInfo } from '../app-types';
import { TokenInfo } from './auth-oauth-handler';

@Injectable({
  providedIn: 'root',
})
export class AuthKeycloakHandler
  extends KeycloakAuthGuard
  implements AuthHandler {
  constructor(
    protected readonly router: Router,
    protected readonly keycloak: KeycloakService
  ) {
    super(router, keycloak);
  }

  getAuthType(): AuthType {
    return AuthType.Keycloak;
  }

  public isAuthenticated(): Promise<boolean> {
    return this.keycloak.isLoggedIn();
    // FIXME: this.authenticated always undefined
    // return Promise.resolve(this.authenticated);
  }

  public getUserInfo(): Promise<UserInfo> {
    return Promise.resolve({
      name: this.keycloak.getUsername(),
      roles: this.keycloak.getUserRoles(true) || [],
    });
  }

  public getTokenInfo(): Promise<TokenInfo> {
    return this.keycloak.getToken().then((token) => ({
      accessToken: token,
    }));
  }

  public login(username: string, password: string): Promise<UserInfo> {
    return Promise.reject('TODO');
  }

  public logout(): Promise<void> {
    return this.keycloak.logout();
  }

  public async isAccessAllowed(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Force the user to log in if currently unauthenticated.
    if (!this.authenticated) {
      await this.keycloak.login({
        redirectUri: window.location.origin + state.url,
      });
    }

    // Get the roles required from the route.
    const requiredRoles = ['a', ' b']; // route.data.roles;

    // Allow the user to to proceed if no additional roles are required to access the route.
    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    // Allow the user to proceed if all the required roles are present.
    return requiredRoles.every((role) => this.roles.includes(role));
  }
}
