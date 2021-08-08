import { merge } from 'lodash-es';
import { environment as comEnv } from './config/environment.common';
import { environment as devEnv } from './environment.dev';
import { IEnvironment } from './environment.types';

export const environment: IEnvironment = merge({}, comEnv, devEnv, {
  name: 'prod',
  production: true,
  elkEndpoint: '', // set empty to disable elk or new endpoint for production
});
