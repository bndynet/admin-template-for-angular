import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { LayoutMode } from './layout.types';

@Component({
  selector: 'el-layout',
  template: `<div
    cdkDropList
    class="el-layout-container"
    class="{{ 'layout-' + mode }}"
    [ngStyle]="styleMap"
    [cdkDropListDisabled]="!dragEnabled"
    [cdkDropListOrientation]="sortDirection"
    (cdkDropListDropped)="drop($event)"
  >
    <div
      cdkDrag
      class="el-layout-item"
      *ngFor="let item of items; index as i"
      [ngStyle]="getItemStyle(item)"
    >
      <ng-container
        *ngTemplateOutlet="itemTemplate; context: { $implicit: item, index: i }"
      ></ng-container>
    </div>
  </div>`,
  styleUrls: ['./layout.component.scss'],
  host: {
    '[class]': 'this.mode',
  },
})
export class LayoutComponent<TItem> implements OnInit, OnChanges {
  @Input() mode: LayoutMode = LayoutMode.Row;
  @Input() items: TItem[] = [];
  @Input() gutter: number | string;
  @Input() itemTemplate: TemplateRef<TItem>;
  @Input() dragEnabled: boolean;

  @Output() itemSorted = new EventEmitter<TItem[]>();

  public sortDirection = 'horizontal';
  public styleMap: { [key: string]: string } = {};
  public itemGlobalStyleMap: { [key: string]: string } = {};

  private halfOfGutter: string;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.mode &&
      changes.mode.currentValue !== changes.mode.previousValue
    ) {
      this.changeLayout(changes.mode.currentValue);
    }

    if (changes.gutter) {
      this.halfOfGutter = this.halfOf(this.gutter);
      this.changeLayout(this.mode);
    }
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
    this.itemSorted.emit(this.items);
  }

  changeLayout(layout: LayoutMode): void {
    this.sortDirection =
      layout === LayoutMode.Column ? 'vertical' : 'horizontal';

    switch (this.mode) {
      case LayoutMode.Row:
        this.styleMap['margin-top'] = '0';
        this.styleMap['margin-right'] = '-' + this.halfOfGutter;
        this.styleMap['margin-bottom'] = '0';
        this.styleMap['margin-left'] = '-' + this.halfOfGutter;

        this.itemGlobalStyleMap['margin-top'] = '0';
        this.itemGlobalStyleMap['margin-right'] = this.halfOfGutter;
        this.itemGlobalStyleMap['margin-bottom'] = '0';
        this.itemGlobalStyleMap['margin-left'] = this.halfOfGutter;
        break;

      case LayoutMode.Column:
        this.styleMap['margin-top'] = '-' + this.halfOfGutter;
        this.styleMap['margin-right'] = '0';
        this.styleMap['margin-bottom'] = '-' + this.halfOfGutter;
        this.styleMap['margin-left'] = '0';

        this.itemGlobalStyleMap['margin-top'] = this.halfOfGutter;
        this.itemGlobalStyleMap['margin-right'] = '0';
        this.itemGlobalStyleMap['margin-bottom'] = this.halfOfGutter;
        this.itemGlobalStyleMap['margin-left'] = '0';
        break;
    }
  }

  getItemStyle(item: any): object {
    const style = {};
    switch (this.mode) {
      case LayoutMode.Row:
        const width = item.__width || item._width || item.width;
        if (width) {
          if (typeof width === 'number') {
            style['flex'] = width.toString();
          } else {
            style['width'] = width;
          }
        }
        break;
    }

    return { ...this.itemGlobalStyleMap, ...style };
  }

  private halfOf(space: number | string): string {
    if (space) {
      return typeof space === 'number'
        ? `${space / 2}rem`
        : `${
            parseInt(space.replace(/(px)(pt)(rem)(em)(%)/g, '')) / 2
          }${space.replace(/\d+/gi, '')}`;
    }

    return '';
  }
}
