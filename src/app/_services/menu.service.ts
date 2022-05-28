import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { menus } from '../admin/menus';
import { Menu, MenuEntity } from '../app-types';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private menuList: Menu[];
  private focusMenus = new ReplaySubject<Menu[]>(1);

  constructor() {
    this.menuList = this.flatMenus(this.getAll());
  }

  public getAll(): Menu[] {
    return menus;
  }

  public activeMenu(menu: Menu): void {
    const menus = this.getParentMenus(menu);
    menus.push(menu);
    this.focusMenus.next(menus);
  }

  public getParentMenus(menu: Menu): Menu[] {
    const result = [];
    let parent = menu;
    while (parent._parent) {
      result.push(parent._parent);
      parent = parent._parent;
    }
    return result.reverse();
  }

  public getCurrentMenuByUrl(appBaseUrl: string): Menu | undefined {
    const currentUrl = location.href;
    const matchedMenu = this.menuList.find(
      (fm) =>
        fm.link &&
        currentUrl.startsWith(
          this.removeDuplicatedSlashesForUrl(`${appBaseUrl}${fm.link}`)
        )
    );
    return matchedMenu;
  }

  public reset(): void {
    this.menuList.forEach((menu) => {
      menu._children = undefined;
      menu._children$ = undefined;
    });
  }

  private flatMenus(menus: Menu[]): Menu[] {
    const result: Menu[] = [];
    const flatChildren = (menu: Menu) => {
      (<MenuEntity>menu).children?.forEach((submenu: Menu) => {
        submenu._parent = menu;
        submenu._id = this.generateId(menu);
        submenu._level = menu._level + 1;
        result.push(submenu);
        flatChildren(submenu);
      });
    };

    menus.forEach((menu) => {
      menu._level = 0;
      menu._id = this.generateId(menu);
      result.push(menu);
      flatChildren(menu);
    });

    return result;
  }

  private removeDuplicatedSlashesForUrl(url: string): string {
    return url.replace(/(?<!:)\/{2,}/g, '/');
  }

  private generateId(menu: Menu): string {
    return [
      menu._parent?._id || '',
      menu.text.replace(/\s+/g, '_').toLowerCase(),
      menu._level,
    ]
      .filter((v) => !!v)
      .join('-');
  }
}
