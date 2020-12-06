import { AuthType } from 'src/app/app-types';

export const environment = {
  production: false,
  authType: AuthType.Local,
  // TODO: remove below node
  oauth: {
    realm: '',
    clientId: '',
    clientSecret: '',
    authorizationUrl: '',
    logoutUrl: '',
  },
};
