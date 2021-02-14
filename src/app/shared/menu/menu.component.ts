import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuEntity } from 'src/app/app-types';
import { AppService } from 'src/app/_services';

@Component({
  selector: 'el-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @Input() data: MenuEntity[];
  @Input() level = 0;

  public collapsed = true;
  public activeMenu: MenuEntity;

  constructor(private app: AppService, private router: Router) {
    this.app.navMenuChanged.subscribe((menu: MenuEntity) => {
      this.activeMenu = menu;
    });
  }

  ngOnInit(): void {}

  onClickMenu(menu: MenuEntity, event: Event): void {
    event.preventDefault();
    menu._collapsed = !menu._collapsed;
    this.app.navMenuChanged.emit(menu);
    if (menu.link) {
      this.router.navigate([menu.link]);
    }
  }
}
