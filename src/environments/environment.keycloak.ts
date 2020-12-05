import { AuthType } from 'src/app/app-types';

export const environment = {
  production: false,
  authType: AuthType.Keycloak,
  oauth: {
    realm: 'newrealm',
    clientId: 'angular',
    authorizationUrl: 'http://localhost:8080/auth',
    logoutUrl: 'https://github.com/logout',
  },
};
