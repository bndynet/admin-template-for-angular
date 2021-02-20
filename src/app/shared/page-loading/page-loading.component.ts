import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'el-page-loading',
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.scss'],
})
export class PageLoadingComponent implements OnInit {
  @Input() show: boolean;
  @Input() title = 'Loading...';
  @Input() description: string;

  constructor() {}

  ngOnInit(): void {}
}
