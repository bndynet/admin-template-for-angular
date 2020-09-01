import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app-sidebar.component.html',
  styleUrls: ['./app-sidebar.component.scss']
})
export class AppSideBarComponent implements OnInit {

  showFiller = false;

  constructor() { }

  ngOnInit(): void {
  }

}
