import { Component, OnInit } from '@angular/core';
import { menus } from 'src/config/menus';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SideBarComponent implements OnInit {

  links: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.links = menus;
  }
}
