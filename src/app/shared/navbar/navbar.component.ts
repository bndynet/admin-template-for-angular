import { Component, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { MenuEntity, MessageEntity, UserEntity } from 'src/app/app-types';
import { AuthService, EventsService } from 'src/app/_services';
import { AppService } from 'src/app/_services/app.service';
import { convertMessages, convertUser } from 'src/config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() menus: MenuEntity[];
  @Output() menuClick = new EventEmitter<MenuEntity>();
  @Output() search = new EventEmitter<string>();

  public messages: MessageEntity[];
  public userInfo: UserEntity;
  public newMessageCount = 0;
  public searchKeywords: string;
  public searchEnabled: boolean;

  constructor(
    private router: Router,
    private app: AppService,
    private auth: AuthService,
    private events: EventsService,
  ) { }

  ngOnInit(): void {
    this.searchEnabled = this.search.observers.length > 0;

    this.auth.getUserInfo().subscribe(
      res => {
        this.userInfo = convertUser(res);
      }
    );

    this.messages = [];
    this.app.getMessages().subscribe(
      res => {
        this.messages = convertMessages(res, this.messages);
        this.newMessageCount = this.messages.filter(message => !message.read).length;
      }
    );
  }

  toggleSidebar(): void {
    this.events.toggleSidebar();
  }

  viewMessage(message: any): void {
    this.app.dialog.alert(`#${message.id} ` + message.title, message.content, () => {
      // TODO: handle read message
      message.read = true;
      this.newMessageCount -= 1;
      this.app.notificaiton.info('You have read this message.');
    }, {
      contentAlign: 'start',
      cancelLabel: 'Close',
      okLabel: '',
      actionsAlign: 'end',
    });
  }

  goto(menu: MenuEntity): void {
    if (menu.link) {
      this.router.navigate([menu.link]);
    }
    this.menuClick.emit(menu);
  }

  onSearch(): void {
    this.search.emit(this.searchKeywords);
  }

  logout(): void {
    this.app.logout();
  }
}
