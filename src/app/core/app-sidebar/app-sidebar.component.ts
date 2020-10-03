import { Component, OnInit } from '@angular/core';
import { menus } from 'src/config/menus';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSideBarComponent implements OnInit {

  links: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.links = menus;
  }
}
