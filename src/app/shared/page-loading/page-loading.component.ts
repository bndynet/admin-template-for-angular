import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-loading',
  templateUrl: './page-loading.component.html',
  styleUrls: ['./page-loading.component.scss']
})
export class PageLoadingComponent implements OnInit {

  @Input() loading: boolean;
  @Input() title = 'Loading...';
  @Input() description: string;

  constructor() { }

  ngOnInit(): void {
  }

}
