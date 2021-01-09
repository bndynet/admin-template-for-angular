import { AuthType } from 'src/app/app-types';

export const environment = {
  production: false,
  authType: AuthType.CustomOAuth,
  oauth: {
    clientId: '188c0da703',
    clientSecret: 'f3dd317369ae622113f0',
    authorizationUrl:
      'http://cloud.bndy.net/service-oauth/authorize?target=github',
    redirectUrl: 'http://localhost:8080/auth/callback',
    userProfileUrl: 'https://api.github.com/user',
    logoutUrl: 'https://github.com/logout',
  },
};
