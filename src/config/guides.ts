import { AppService, IHighlightOption } from 'src/app/_services';

export interface IGuideItem {
  path: string;
  steps: IHighlightOption[];
}

// TODO: define your steps for page
export const getGuides = (appService: AppService): IGuideItem[] => [
  {
    path: '/login',
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
    steps: [
      {
        elementId: 'mainNav',
        description: 'Here is the main navigation bar.',
        background: appService.getActiveThemeColor('primary'),
      },
      {
        elementId: 'searchInput',
        description: 'Here to implement global search function.',
        background: appService.getActiveThemeColor('primary'),
      },
    ],
  },
];
