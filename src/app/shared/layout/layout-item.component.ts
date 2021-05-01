import { Component, Host, Input, OnInit } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { LayoutItemData, LayoutMode } from './layout.types';

@Component({
  selector: 'el-layout-item',
  template: `<ng-content></ng-content>`,
  host: {
    '[style]': 'style',
  },
})
export class LayoutItemComponent implements OnInit {
  @Input() size: number | string;
  @Input() data: LayoutItemData;

  private styleMap: { [key: string]: string } = {};

  public style: string;

  constructor(@Host() private parentComp: LayoutComponent) {}

  ngOnInit(): void {
    switch (this.parentComp.options.mode) {
      case LayoutMode.Row:
        this.styleMap['flex'] = (this.data.width || '1').toString();
        this.setStyles();
        break;
    }

    if (this.parentComp.options.gutter) {
      const half =
        typeof this.parentComp.options.gutter === 'number'
          ? this.parentComp.options.gutter / 2
          : `${
              parseInt(
                this.parentComp.options.gutter.replace(
                  /(px)(pt)(rem)(em)(%)/g,
                  ''
                )
              ) / 2
            }${this.parentComp.options.gutter.replace(/\d+/gi, '')}`;
      this.styleMap['margin'] = typeof half === 'number' ? `${half}rem` : half;
      this.setStyles();
    }
  }

  private setStyles(): void {
    this.style = Object.keys(this.styleMap)
      .map((key) => `${key}: ${this.styleMap[key]}`)
      .join(';');
  }
}
