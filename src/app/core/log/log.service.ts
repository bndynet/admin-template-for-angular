import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Logger, LogType, RequestLogFields } from './logger';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  private logger: Logger;

  constructor() {
    this.logger = new Logger(environment.elkEndpoint);
    console.log(environment);
  }

  public logApiRequest(
    requestUrl: string,
    requestMethod: string,
    responseCode: number,
    elapsedTime: number,
    logType: LogType,
    message?: string
  ) {
    // TODO: create and set correlation id
    const logFields: RequestLogFields = {
      environment: environment.name,
      isProduction: environment.production,
      appName: environment.appName,
      appVersion: environment.version,
      userId: '',
      requestUrl,
      requestMethod,
      responseCode,
      elapsedTime,
      currentUrl: location.href,
    };

    if (!environment.production) {
      const msg = `${requestMethod} [${responseCode}] - ${requestUrl} in ${elapsedTime} ms.`;
      console.debug(msg);
    }

    this.logger.log(logType, message, logFields);
  }
}
