import { AuthConfig } from 'angular-oauth2-oidc';
import { AuthType } from 'src/app/app-types';

export interface IEnvironment {
  name?: string;
  appName?: string;
  version?: string;
  production?: boolean;
  authType?: AuthType;
  oauth?: AuthConfig;
  elkEndpoint?: string;

  maxElapsedTimeForApiRequest?: number;
}
