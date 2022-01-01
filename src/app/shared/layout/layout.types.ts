export interface ILayoutDataItem<TItem> {
  id: string | number;
  width?: number | string;
  height?: number | string;
  x?: number;
  y?: number;
  isLayout?: boolean;
  mode?: LayoutMode;
  data?: TItem;
  items?: ILayoutDataItem<TItem>[];
}

export interface ILayoutData<TItem> {
  mode: LayoutMode;
  gutter: number | string;
  items: ILayoutDataItem<TItem>[];
}

export enum LayoutMode {
  Row = 'row',
  Column = 'column',
  Free = 'free',
}
