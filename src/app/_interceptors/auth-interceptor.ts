import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService, AuthService } from 'src/app/_services';
import { KEY_AUTHORIZATION, KEY_TRACKING_ID } from '../app-types';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private app: AppService,
    private auth: AuthService,
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.auth.getAuthorizationToken();
    const headers = {};
    headers[KEY_AUTHORIZATION] = `Bearer ${authToken}`;
    headers[KEY_TRACKING_ID] = this.app.clientTrackingID;
    const authReq = req.clone({
      setHeaders:  headers,
    });
    return next.handle(authReq);
  }
}