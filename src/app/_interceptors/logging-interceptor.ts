import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    let statusText: string;
    let statusCode: number;
    let message: string;

    return next.handle(req)
      .pipe(
        tap(
          event => {
            statusCode = event instanceof HttpResponse ? 200 : -1;
            statusText = 'OK';
          },
          error => {
            if (error instanceof HttpErrorResponse) {
              statusCode = error.status;
              statusText = error.statusText;
              message = error.message;
            }
          }
        ),
        finalize(() => {
          const elapsed = Date.now() - startTime;
          const msg = `${req.method} [${statusCode}] - ${req.urlWithParams}in ${elapsed} ms.`;
          console.debug(msg);
        })
      );
  }
}
