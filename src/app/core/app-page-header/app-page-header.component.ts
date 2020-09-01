import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './app-page-header.component.html',
  styleUrls: ['./app-page-header.component.scss']
})
export class AppPageHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() subtitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
