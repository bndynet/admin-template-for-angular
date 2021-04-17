import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.canActivateProtectedRoutes$.pipe(
      tap((x) => {
        console.log(`You tried to go to ${state.url} and this guard said ${x}`);
      })
    );
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthGuardWithForceLogin implements CanActivate {
  constructor(private authService: AuthService) {}

  canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isDoneAuth().pipe(
      filter((isDone) => isDone),
      switchMap((_) => this.authService.isAuthenticated()),
      tap((isAuthenticated) => {
        console.log(
          `You tried to go to ${state.url} and this guard said ${isAuthenticated}`
        );
        isAuthenticated || this.authService.login(state.url);
      })
    );
  }
}
