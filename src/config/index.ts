export * from './converters';
export * from './requests';

export const protectedUrlPrefixes = []; // ['/admin'];

// The keys MUST defined in ../styles/_theme.scss file
export const themes = {
  dark: 'Dark Theme',
  popular: 'Popular Theme',
};

export const roles = {
  role_admin: 'Administrator',
  role_doc: 'Document Owner',
};
