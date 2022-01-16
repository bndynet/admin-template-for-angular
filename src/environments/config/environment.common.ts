import packageInfo from '../../../package.json';
import { IEnvironment } from '../environment.types';

export const environment: IEnvironment = {
  appName: packageInfo.name,
  version: packageInfo.version,
  maxElapsedTimeForApiRequest: 100,
  elkEndpoint: 'http://127.0.0.1:5044',
};
