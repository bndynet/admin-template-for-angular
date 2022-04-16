import { ThemeEntity } from 'src/app/app-types';

export const app = {
  title: 'Angular Starter Project by Bendy',

  // TODO: use localization instead
  roles: {
    role_admin: 'Administrator',
    role_doc: 'Document Owner',
  },

  // TODO: define your protected page
  protectedUrlPrefixes: [], // ['/admin'];

  // The keys MUST be defined in ../styles/_theme.scss file
  themes: [
    {
      key: 'dark',
      name: 'Dark Theme',
      isDark: true,
    },
    {
      key: 'popular',
      name: 'Popular Theme',
    },
  ] as ThemeEntity[],
};
