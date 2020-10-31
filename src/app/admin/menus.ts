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
    roles: ['role_doc'],
    children: [
      {
        icon: 'bookmark_border',
        text: 'Environments',
        link: '',
        children: [
          {
            icon: 'bookmark_border',
            text: 'Development',
            link: '',
          },
          {
            icon: 'bookmark_border',
            text: 'Production',
            link: '',
          },
        ],
      },
      {
        icon: 'bookmark_border',
        text: 'Tools',
        link: '',
        children: [
          {
            icon: 'bookmark_border',
            text: 'Tool 1',
            link: '',
            children: [
              {
                icon: 'bookmark_border',
                text: 'Tool 1-1',
                link: '',
              },
              {
                icon: 'bookmark_border',
                text: 'Tool 1-2',
                link: '',
              },
            ],
          },
          {
            icon: 'bookmark_border',
            text: 'Tool 2',
            link: '',
          },
        ],
      },
    ],
  },
  {
    text: 'RESOURCES',
    link: '',
    roles: ['role_admin'],
    children: [
      {
        icon: 'tag',
        text: 'MENU',
      },
    ],
  },
  {
    text: 'EVENTS',
    link: '',
    children: [
      {
        icon: 'tag',
        text: 'MENU',
      },
    ],
  },
];
