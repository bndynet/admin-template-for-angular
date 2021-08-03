import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuEntity, MessageEntity, UserInfo } from 'src/app/app-types';
import { AuthService, EventsService } from 'src/app/_services';
import { AppService } from 'src/app/_services/app.service';
import { convertMessages, roles, themes } from 'src/config';

@Component({
  selector: 'el-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() menus: MenuEntity[];
  @Output() menuClick = new EventEmitter<MenuEntity>();
  @Output() search = new EventEmitter<string>();

  public messages: MessageEntity[];
  public userInfo: UserInfo;
  public userRoles: string[];
  public newMessageCount = 0;
  public searchKeywords: string;
  public searchEnabled: boolean;
  public themes = themes;

  constructor(
    private router: Router,
    private app: AppService,
    private auth: AuthService,
    private events: EventsService
  ) {}

  ngOnInit(): void {
    this.searchEnabled = this.search.observers.length > 0;

    this.auth.getUser().subscribe((res) => {
      this.userInfo = res;
      if (this.userInfo) {
        this.userRoles = (res.roles || []).map((r) => roles[r] || r);
      } else {
        this.app.logout();
      }
    });

    this.messages = [];
    this.app.getMessages().subscribe((res) => {
      this.messages = convertMessages(res, this.messages);
      this.newMessageCount = this.messages.filter(
        (message) => !message.read
      ).length;
    });
  }

  toggleSidebar(): void {
    this.events.toggleSidebar();
  }

  viewMessage(message: any): void {
    this.app.dialog.alert(
      `#${message.id} ` + message.title,
      message.content,
      () => {
        // TODO: handle read message
        message.read = true;
        this.newMessageCount -= 1;
        this.app.notificaiton.info('You have read this message.');
      },
      {
        contentAlign: 'start',
        cancelLabel: 'Close',
        okLabel: '',
        actionsAlign: 'end',
      }
    );
  }

  goto(menu: MenuEntity): void {
    this.menuClick.emit(menu);
    this.gotoMenu(menu);
  }

  changeTheme(themeKey: string): void {
    this.app.theme.changeTheme(themeKey);
  }

  onSearch(): void {
    this.search.emit(this.searchKeywords);
  }

  getUserRoles() {
    return;
  }

  logout(): void {
    this.app.logout();
  }

  private gotoMenu(menu: MenuEntity): void {
    if (menu.link) {
      this.app.navMenuChanged.emit(menu);
      this.router.navigate([menu.link]);
    } else if (menu.children && menu.children.length > 0) {
      this.gotoMenu(menu.children[0]);
    }
  }
}
