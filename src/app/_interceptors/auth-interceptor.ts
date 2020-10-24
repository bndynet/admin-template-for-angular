import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppService } from 'src/app/_services';
import { KEY_AUTHORIZATION, KEY_TRACKING_ID } from '../app-types';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private app: AppService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.app.auth.getAuthorizationToken();
    const headers = {};
    if (authToken) {
      headers[KEY_AUTHORIZATION] = `Bearer ${authToken}`;
    }
    headers[KEY_TRACKING_ID] = this.app.clientTrackingID;
    const authReq = req.clone({
      setHeaders: headers,
    });
    return next.handle(authReq).pipe(
      tap((evt) => {
        if (evt instanceof HttpResponse) {
          // here to handle common repsonse
        }
      }),
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          this.app.notificaiton.error(`${err.message}`);
          switch (err.status) {
            case 404:
              break;

            default:
              break;
          }
        }
        return of(err);
      })
    );
  }
}
