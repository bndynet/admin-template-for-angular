import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from 'src/app/app-types';
import { mockRequest } from 'src/utils';

export function login(
  http: HttpClient,
  username: string,
  password: string
): Observable<UserEntity> {
  return http.get(`/assets/user.json`).pipe(
    map((u: UserEntity) => {
      const user = {
        ...u,
        ...{ name: username, token: password },
      } as UserEntity;
      return user;
    })
  );
}

export function logout(http, env): Observable<any> {
  return mockRequest();
}
