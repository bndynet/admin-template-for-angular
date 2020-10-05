import { Component, OnInit } from '@angular/core';
import { MessageEntity, UserEntity } from 'src/app/app-types';
import { AuthService, EventsService } from 'src/app/_services';
import { AppService } from 'src/app/_services/app.service';
import { convertMessages, convertUser } from 'src/config';
import { menus } from 'src/app/admin/menus';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public messages: MessageEntity[];
  public userInfo: UserEntity;
  public navs: any[];
  public newMessageCount = 0;

  constructor(
    private app: AppService,
    private auth: AuthService,
    private events: EventsService,
  ) { }

  ngOnInit(): void {
    this.navs = menus;

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

  logout(): void {
    this.app.logout();
  }
}
