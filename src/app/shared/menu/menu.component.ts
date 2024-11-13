import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { Menu } from 'src/app/app-types';
import { AppService } from 'src/app/_services';

@Component({
  selector: 'el-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnChanges, OnDestroy {
  @Input() level = 0;
  @Input() data: Menu[];

  public collapsed = true;
  public activeMenu: Menu;

  private destroyed$ = new Subject<void>();
  private menusActiveSub: Subscription;

  constructor(
    private appService: AppService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      changes.data.currentValue.forEach((menu: Menu) => {
        menu._children$ = this.appService.auth.getSubMenus(menu).pipe(
          finalize(() => {
            this.changeDetectorRef.detectChanges();
          })
        );
      });

      if (this.menusActiveSub) {
        this.menusActiveSub.unsubscribe();
      }
      this.menusActiveSub = this.appService.menusActive$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((menus: Menu[]) => {
          this.activeMenu = this.data?.find((item) => menus.includes(item));
        });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  onClickMenu(menu: Menu, event: Event): void {
    this.appService.auth.getSubMenus(menu).subscribe((children) => {
      if (children && children.length > 0) {
        menu._collapsed = !menu._collapsed;
      } else {
        this.activeMenu = menu;
        this.appService.activeMenu(menu);
      }
    });
  }
}
