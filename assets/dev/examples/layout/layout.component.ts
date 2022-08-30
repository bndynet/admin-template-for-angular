import { Component, OnInit } from '@angular/core';
import { ILayoutData, LayoutMode } from 'src/app/shared/layout';

@Component({
  selector: 'app-examples-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  draggable = true;
  layoutData: ILayoutData<{ text: string }> = {
    mode: LayoutMode.Row,
    gutter: '1rem',
    items: [
      {
        id: 1,
        width: 1,
        data: {
          text: `#1 This defines the default behavior for how flex items...`,
        },
      },
      {
        id: 2,
        width: 2,
        data: {
          text: `#2 This defines the default behavior for how flex items...`,
        },
      },
      {
        id: 3,
        width: 2,
        data: {
          text: `#3 This defines the default behavior for how flex items...`,
        },
      },
      {
        id: 4,
        width: '100px',
        data: {
          text: `#4  100px This defines the default behavior for how flex items...`,
        },
      },
      {
        id: 5,
        width: 2,
        isLayout: true,
        mode: LayoutMode.Row,
        items: [
          {
            id: 51,
            width: 1,
            data: {
              text: '#51 Text',
            },
          },
          {
            id: 52,
            width: 2,
            data: {
              text: '#52 Text',
            },
          },
          {
            id: 53,
            width: 1,
            data: {
              text: '#53 Text',
            },
          },
        ],
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  changeLayout(layout: string): void {
    this.layoutData.mode = layout as LayoutMode;
    console.log(
      `🚀 ~ file: layout.component.ts ~ line 67 ~ LayoutComponent ~ changeLayout ~ mode`,
      this.layoutData
    );
  }

  sort(arr: any[]) {
    console.log(arr);
  }
}
