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
    // return http.get(getLocalUrl(`/assets/user.json`)).pipe(
    return http
      .get(
        'https://pda-server7.cisco.com/davis/api/v1/orgs/1eb65fdf-9643-417f-9974-ad72cae0e10f/dashboards/B5D78B862CE15AD8E053322A1D0A9AE4/charts/B5D78F7E87F85BAAE053322A1D0AD0B4/timecolumn/show?limit=300'
      )
      .pipe(
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
