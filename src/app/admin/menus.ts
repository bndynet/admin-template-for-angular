import { MenuEntity, roles } from '../app-types';
import { menus as devMenus } from './dev/menus';

export const menus: MenuEntity[] = [
  ...devMenus,
  {
    text: 'HELLO',
    children: [
      {
        text: 'World',
        link: '/admin/hello',
      },
    ],
  },
  {
    text: 'DOCS',
    link: '',
    roles: [roles.docs],
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
    text: 'ADMIN',
    link: '',
    roles: [roles.admin],
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
