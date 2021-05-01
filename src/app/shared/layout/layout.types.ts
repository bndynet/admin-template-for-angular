export enum LayoutMode {
  Normal = 'layout-normal',
  Float = 'layout-float',
  Row = 'layout-row',
  Column = 'layout-column',
  Free = 'layout-free',
}

export interface LayoutOptions {
  mode: LayoutMode;
  gutter?: number | string;
}

export interface LayoutItemData {
  width?: number | string;
}
