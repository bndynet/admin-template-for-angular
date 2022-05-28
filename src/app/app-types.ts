import { Observable } from 'rxjs';
import { TokenInfo } from './_services/auth-oauth-handler';

export const KEY_TRACKING_ID = 'AppTrackingID';
export const KEY_AUTHORIZATION = 'Authorization';

declare global {
  interface Window {
    APP_BUILD: string;
    APP_VERSION: string;
  }
}

export interface ThemeEntity {
  key: string;
  name: string;
  isDark?: boolean;
}

export interface AuthHandler {
  isAuthenticated$: Observable<boolean>;
  isDoneAuth$: Observable<boolean>;
  getUserInfo$: Observable<UserInfo>;
  init: () => void;
  getAuthType: () => AuthType;
  getTokenInfo: () => Promise<TokenInfo>;
  login: (
    targetUrl?: string,
    username?: string,
    password?: string
  ) => Observable<UserInfo> | void;
  logout: () => Promise<void> | void;
}

export enum AuthType {
  Local,
  OAuth,
}

// TODO: define your roles
export enum Role {
  Admin = 'role_admin',
  Doc = 'role_doc',
}

// you can find all country flags in http://hjnilsson.github.io/country-flags/
export const Langs = [
  {
    label: '简体中文',
    value: 'zh-CN',
    icon:
      'https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/cn.svg',
  },
  {
    label: 'English (United States)',
    value: 'en-US',
    icon:
      'https://cdn.staticaly.com/gh/hjnilsson/country-flags/master/svg/us.svg',
  },
];

export interface MenuEntity {
  text: string;
  icon?: string;
  link?: string;
  roles?: string[];
  children?: MenuEntity[];
  enable?:
    | ((userRoles: Role[], thisMenu: MenuEntity) => Observable<boolean>)
    | Observable<boolean>;
}

export interface Menu extends Omit<MenuEntity, 'children'> {
  _id?: string;
  _level?: number;
  _collapsed?: boolean;
  _parent?: Menu;
  _children?: Menu[];
  _children$?: Observable<Menu[]>;
}

export interface UserInfo {
  name: string;
  title?: string;
  avatar?: string;
  roles?: Role[];
  accessToken?: string;
}

export interface MessageEntity {
  id: string;
  title: string;
  createdAt?: string;
  read?: boolean;
}

export const httpStatusMap = {
  401: {
    title: 'Unauthorized',
    description: 'The requested page needs a username and a password.',
  },
  403: {
    title: 'Forbidden',
    description: 'Access is forbidden to the requested page.',
  },
  404: {
    title: 'Not Found',
    description: 'The server can not find the requested page.',
  },
  408: {
    title: 'Request Timeout',
    description:
      'The request took longer than the server was prepared to wait.',
  },
  500: {
    title: 'Internal Server Errort',
    description:
      'The request was not completed. The server met an unexpected condition.',
  },
};
