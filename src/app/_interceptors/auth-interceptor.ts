import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { isMatch } from 'matcher';
import { from, Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AppService } from 'src/app/_services';
import { urlsToIgnoreResponseError } from 'src/config';
import { getLocalUrl } from 'src/utils';
import { KEY_AUTHORIZATION, KEY_TRACKING_ID } from '../app-types';
import { TokenInfo } from '../_services/auth-oauth-handler';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private app: AppService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return from(this.app.auth.getTokenInfo()).pipe(
      switchMap((token: TokenInfo) => {
        const headers = {};
        if (token) {
          const accessToken = token.accessToken;
          if (accessToken) {
            headers[KEY_AUTHORIZATION] = `Bearer ${accessToken}`;
          }
        }
        headers[KEY_TRACKING_ID] = this.app.clientTrackingID;
        const authReq = req.clone({
          setHeaders: headers,
          url: getLocalUrl(req.url),
        });
        return next.handle(authReq).pipe(
          tap((evt) => {
            if (evt instanceof HttpResponse) {
              // here to handle common repsonse
            }
          }),
          catchError((err) => {
            if (err instanceof HttpErrorResponse) {
              const isIgnored = isMatch(req.url, urlsToIgnoreResponseError);
              if (!isIgnored) {
                this.app.notificaiton.error(`${err.message}`);
                switch (err.status) {
                  case 404:
                    break;

                  default:
                    break;
                }
              }
            }
            return throwError(err);
          })
        );
      })
    );
  }
}
