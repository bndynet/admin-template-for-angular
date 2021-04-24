// import { environment as env } from './environment.oauth';
import { merge } from 'lodash-es';
import { environment as comEnv } from './config/environment.common';
import { environment as env } from './config/environment.local';
import { IEnvironment } from './environment.types';

export const environment: IEnvironment = merge({}, comEnv, env, {
  name: 'dev',
  production: false,
  // elkEndpoint: '',   // set empty to disable elk
});
