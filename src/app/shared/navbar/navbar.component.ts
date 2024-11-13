import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Menu, MessageEntity, UserInfo } from 'src/app/app-types';
import { AuthService, EventsService } from 'src/app/_services';
import { AppService } from 'src/app/_services/app.service';
import { app, convertMessages } from 'src/config';

@Component({
  selector: 'el-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnChanges, OnDestroy {
  @Input() menus: Menu[];
  @Output() menuClick = new EventEmitter<Menu>();
  @Output() search = new EventEmitter<string>();

  public messages: MessageEntity[];
  public userInfo: UserInfo;
  public userRoles: string[];
  public newMessageCount = 0;
  public searchKeywords: string;
  public searchEnabled: boolean;
  public activeMenu?: Menu;
  public themes;

  private menusActiveSub: Subscription;
  private destroyed$ = new Subject<void>();

  constructor(
    private auth: AuthService,
    private events: EventsService,
    private appService: AppService
  ) {
    this.themes = app.themes;
  }

  ngOnInit(): void {
    this.searchEnabled = this.search.observers.length > 0;

    this.auth.getUser().subscribe((res) => {
      this.userInfo = res;
      if (this.userInfo) {
        this.userRoles = res.roles || [];
      } else {
        this.appService.logout();
      }
    });

    this.messages = [];
    this.appService.getMessages().subscribe((res) => {
      this.messages = convertMessages(res, this.messages);
      this.newMessageCount = this.messages.filter(
        (message) => !message.read
      ).length;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.menus && changes.menus.currentValue) {
      if (this.menusActiveSub) {
        return;
      }
      this.menusActiveSub = this.appService.menusActive$
        .pipe(takeUntil(this.destroyed$))
        .subscribe((menus): void => {
          this.activeMenu = this.menus?.find((m) => m === menus[0]);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  toggleSidebar(): void {
    this.events.toggleSidebar();
  }

  viewMessage(message: any): void {
    this.appService.dialog.alert(
      `#${message.id} ` + message.title,
      message.content,
      () => {
        // TODO: handle read message
        message.read = true;
        this.newMessageCount -= 1;
        this.appService.notification.info('You have read this message.');
      },
      {
        contentAlign: 'start',
        cancelLabel: 'Close',
        okLabel: '',
        actionsAlign: 'end',
      }
    );
  }

  goto(menu: Menu): void {
    if (this.activeMenu !== menu) {
      this.activeMenu = menu;
      this.menuClick.emit(menu);
      this.appService.activeMenu(menu);
    }
  }

  changeTheme(themeKey: string): void {
    this.appService.theme.changeTheme(themeKey);
  }

  onSearch(): void {
    this.search.emit(this.searchKeywords);
  }

  getUserRoles() {
    return;
  }

  logout(): void {
    this.appService.logout();
  }

  trackMenusByIndex(index: number, _menu: Menu): number {
    return index;
  }
}
