import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MenuEntity, Role } from '../app-types';
import { menus as devMenus } from './dev/menus';

export const menus: MenuEntity[] = [
  ...devMenus,
  {
    icon: 'info',
    text: 'HELLO',
    children: [
      {
        text: 'hi',
        link: '/admin/hello',
      },
      {
        text: 'enable: (Role[]) => if admin',
        enable: (userRoles: Role[]) => {
          return of(userRoles.includes(Role.Admin));
        },
      },
      {
        text: 'enable: () => Observable<boolean>',
        enable: () => {
          return of(true).pipe(delay(2000));
        },
      },
      {
        text: 'enable: Observable<boolean>',
        enable: of(true).pipe(delay(3000)),
      },
    ],
  },
  {
    icon: 'menu_book',
    text: 'DOC',
    roles: [Role.Doc],
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
                text: 'Form Components',
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
    roles: [Role.Admin],
    children: [
      {
        icon: 'tag',
        text: 'MENU',
      },
    ],
  },
];
