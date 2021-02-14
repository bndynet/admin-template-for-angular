import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'el-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent implements OnInit {
  @Input() canBack: boolean;
  @Input() title: string;
  @Input() subtitle: string;

  constructor(private location: Location) {}

  ngOnInit(): void {}

  back(): void {
    this.location.back();
  }
}
