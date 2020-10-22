import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { v4 as uuid } from 'uuid';

export function ifUndefined(arg: any, val: any): any {
  if (typeof arg === 'undefined') {
    return val;
  }
  return arg;
}

export function getUUID(): string {
  return uuid();
}

export function randomString(length: number, characters?: string): string {
  characters = characters || 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let result = '';
  const maxLen = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * maxLen));
  }
  return result;
}

export function mockRequest<TResponse>(response?: TResponse): Observable<TResponse> {
  return of((response || {}) as TResponse).pipe(delay(3000));
}

export function mockErrorResponse(http: HttpClient): Observable<any> {
  return http.get(getLocalUrl('/assets/notfound.json'));
}

export function getLocalUrl(path: string): string {
  return `${document.baseURI}/${path}`;
}
