import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { LogService } from './log/log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private logService: LogService, private zone: NgZone) {}

  public handleError(error: any): void {
    // Check if it's an error from an HTTP response
    const isServerError = error instanceof HttpErrorResponse;

    if (!isServerError) {
      this.logService.logJsError(error);
    }

    console.error('Error from Global Error Handler', error);
  }
}
