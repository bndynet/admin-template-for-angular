import { name, version } from '../../../package.json';
import { IEnvironment } from '../environment.types';

export const environment: IEnvironment = {
  appName: name,
  version: version,
  maxElapsedTimeForApiRequest: 100,
  elkEndpoint: 'http://127.0.0.1:5044',
};
