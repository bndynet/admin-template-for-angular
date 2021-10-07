import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examples-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  draggable = true;
  layoutData = {
    mode: 'row',
    gutter: '1rem',
    data: [
      {
        id: 1,
        width: 1,
        text: `#1 This defines the default behavior for how flex items...`,
      },
      {
        id: 2,
        width: 2,
        text: `#2 This defines the default behavior for how flex items...`,
      },
      {
        id: 3,
        width: 2,
        text: `#3 This defines the default behavior for how flex items...`,
      },
      {
        id: 4,
        width: '100px',
        text: `#4  100px This defines the default behavior for how flex items...`,
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}

  changeLayout(layout: string): void {
    this.layoutData.mode = layout;
  }

  sort(arr: any[]) {
    console.log(arr);
  }
}
