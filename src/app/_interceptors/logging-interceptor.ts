import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LogService } from '../core/log/log.service';
import { LogType } from '../core/log/logger';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private logService: LogService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const startTime = Date.now();
    let statusText: string;
    let statusCode: number;
    let message: string;

    return next.handle(req).pipe(
      tap(
        (event) => {
          statusCode = event instanceof HttpResponse ? 200 : -1;
          statusText = 'OK';
        },
        (error) => {
          if (error instanceof HttpErrorResponse) {
            statusCode = error.status;
            statusText = error.statusText;
            message = error.message;
          }
        }
      ),
      finalize(() => {
        const elapsed = Date.now() - startTime;

        let logType = LogType.Info;
        if (environment.maxElapsedTimeForApiRequest) {
          if (elapsed > environment.maxElapsedTimeForApiRequest) {
            console.warn(`Your request took ${elapsed} ms for ${req.url}.`);
            logType = LogType.Warning;
          }
        }

        if (statusCode >= 400) {
          logType = LogType.Error;
        }

        this.logService.logApiRequest(
          req.urlWithParams,
          req.method,
          statusCode,
          elapsed,
          logType
        );
      })
    );
  }
}
