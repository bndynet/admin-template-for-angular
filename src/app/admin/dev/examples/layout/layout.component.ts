import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { LayoutMode } from 'src/app/shared/layout/layout.types';

@Component({
  selector: 'app-examples-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  layoutData = {
    mode: LayoutMode.Row,
    gutter: '10px',
    items: [
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
        width: 1,
        text: `#4 This defines the default behavior for how flex items...`,
      },
    ],
  };

  sortDirection = 'horizontal';

  constructor() {}

  ngOnInit(): void {}

  drop(dataItems: any[], event: CdkDragDrop<any[]>) {
    moveItemInArray(dataItems, event.previousIndex, event.currentIndex);
  }

  changeLayout(layout: string): void {
    this.layoutData.mode =
      layout === 'column' ? LayoutMode.Column : LayoutMode.Row;
    this.sortDirection = layout === 'column' ? 'vertical' : 'horizontal';
  }
}
