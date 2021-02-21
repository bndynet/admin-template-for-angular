import { AppService, IHighlightOption } from 'src/app/_services';

export interface IGuideItem {
  path: string;
  version: number;
  steps: IHighlightOption[];
}

// TODO: define your steps for page, if anychange, you should increase the version for show them.
export const getGuides = (appService: AppService): IGuideItem[] => [
  {
    path: '/login',
    version: 0,
    steps: [
      {
        elementId: 'loginCard',
        title: 'Tips:',
        description: `<ul>
          <li>Type anything to log in.</li>
          <li>Click language to change.</li>
        </ul>
        `,
        bordered: true,
        position: 'right',
      },
    ],
  },
  {
    path: '/admin/hi',
    version: 0,
    steps: [
      {
        elementId: 'mainNav',
        description: 'Here is the main navigation bar.',
        background: appService.theme.getActiveThemeColor('primary'),
      },
      {
        elementId: 'searchInput',
        description: 'Here to implement global search function.',
        background: appService.theme.getActiveThemeColor('primary'),
      },
    ],
  },
];
