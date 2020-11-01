import { merge } from 'lodash-es';
import { environment as devEnv } from './environment.dev';

export const environment = merge({}, devEnv, {
  production: true,
});
