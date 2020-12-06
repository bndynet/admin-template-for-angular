import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from 'src/app/app-types';
import { getLocalUrl } from 'src/utils';

export const environment = {
  production: false,
  // TODO: remove below node
  oauth: {
    clientId: '',
    clientSecret: '',
    authorizationUrl: '',
    logoutUrl: '',
  },
  login: (
    http: HttpClient,
    username: string,
    password: string
  ): Observable<UserEntity> => {
    // TODO: call your login url with provided username and password
    return http.get(getLocalUrl(`/assets/user.json`)).pipe(
      map((response) => {
        // TODO: convert to UserEntity from backend response
        return (username
          ? {
              ...response,
              ...{ name: username, accessToken: password },
            }
          : response) as UserEntity;
      })
    );
  },
  logout: (http: HttpClient): Observable<void> => {
    // TODO: use corrent url to log out
    return http.get(getLocalUrl('/assets/user.json')).pipe(
      map(() => {
        return;
      })
    );
  },
};
