import { MenuEntity } from '../app-types';

export const menus: MenuEntity[] = [
  {
    icon: 'star',
    text: 'GET STARTED',
    children: [
      {
        icon: 'star',
        text: 'Interactive',
        link: '/admin/hi',
      },
      {
        icon: 'subject',
        text: 'Hero List',
        link: '/admin/heroes',
      },
      {
        icon: 'warning',
        text: 'Error Page',
        link: '/admin/error',
      },
    ],
  },
  {
    text: 'DOCS',
    link: '',
    children: [
      {
        icon: 'tag',
        text: 'Environments',
        link: '',
      },
    ]
  },
  {
    text: 'RESOURCES',
    link: '',
    children: [
      {
        icon: 'tag',
        text: 'MENU',
      },
    ]
  },
  {
    text: 'EVENTS',
    link: '',
    children: [
      {
        icon: 'tag',
        text: 'MENU',
      },
    ]
  },
];
