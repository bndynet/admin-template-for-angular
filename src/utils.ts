import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export function ifUndefined(arg: any, val: any): any {
  if (typeof arg === 'undefined') {
    return val;
  }
  return arg;
}

export function mockRequest<TResponse>(
  response?: TResponse
): Observable<TResponse> {
  return of((response || {}) as TResponse).pipe(delay(3000));
}

export function mockErrorResponse(http: HttpClient): Observable<any> {
  return http.get(getLocalUrl('/assets/notfound.json'));
}

export function getLocalUrl(path: string): string {
  if (path && path.toLowerCase().startsWith('http')) {
    return path;
  }

  return `${document.baseURI}/${path}`.replace(/(?<=[^:])\/{2,}/g, '/');
}
