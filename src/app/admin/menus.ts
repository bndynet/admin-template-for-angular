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
        text: 'Introduction',
      },
      {
        text: 'Getting Started',
        children: [
          {
            text: 'Try it',
          },
          {
            text: 'Setup',
          },
        ],
      },
      {
        text: 'Main Concepts',
        children: [
          {
            text: 'Components',
            children: [
              {
                text: 'Form Compoents',
                children: [
                  {
                    text: 'Reactive Forms',
                  },
                  {
                    text: 'Validate form input',
                  },
                ],
              },
            ],
          },
          {
            text: 'Templates',
          },
          {
            text: 'Directives',
          },
          {
            text: 'Dependency Injection',
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
