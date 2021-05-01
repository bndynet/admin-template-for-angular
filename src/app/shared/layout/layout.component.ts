import { Component, Input, OnInit } from '@angular/core';
import { LayoutMode, LayoutOptions } from './layout.types';

@Component({
  selector: 'el-layout',
  template: '<ng-content></ng-content>',
  styleUrls: ['./layout.component.scss'],
  host: {
    cdkDropList: '',
    '[class]': 'this.options.mode',
    '[style]': 'style',
  },
})
export class LayoutComponent implements OnInit {
  @Input() options: LayoutOptions;

  public layoutMode = LayoutMode.Normal;
  public style: string;

  private styleMap: { [key: string]: string } = {};

  constructor() {}

  ngOnInit(): void {
    if (this.options) {
      if (this.options.gutter) {
        const halfOfGutter = this.halfOf(this.options.gutter);
        this.styleMap['margin'] = '-' + halfOfGutter;
        this.setStyles();
      }

      this.layoutMode = this.options.mode;
    }
  }

  private halfOf(space: number | string): string {
    return typeof space === 'number'
      ? `${space / 2}rem`
      : `${
          parseInt(space.replace(/(px)(pt)(rem)(em)(%)/g, '')) / 2
        }${space.replace(/\d+/gi, '')}`;
  }

  private setStyles(): void {
    this.style = Object.keys(this.styleMap)
      .map((key) => `${key}: ${this.styleMap[key]}`)
      .join(';');
  }
}
