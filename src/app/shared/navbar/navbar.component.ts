import { Component, OnInit } from '@angular/core';
import { MessageEntity, UserEntity } from 'src/app/app-types';
import { AuthService, EventsService, MessageService, NotificationService } from 'src/app/_services';
import { AppService } from 'src/app/_services/app.service';
import { menus } from 'src/config/menus';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public messages: MessageEntity[];
  public userInfo: UserEntity;
  public navs: any[];

  constructor(
    private app: AppService,
    private auth: AuthService,
    private events: EventsService,
    private messageService: MessageService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.navs = menus;

    this.auth.getUserInfo().subscribe(
      res => {
        this.userInfo = res;
      }
    );
    this.messageService.getMessage().subscribe(
      res => {
        this.messages = res;
      }
    );
  }

  toggleSidebar(): void {
    this.events.toggleSidebar();
  }

  viewMessage(message: any): void {
    this.app.dialog.alert(`#${message.id} ` + message.title, message.content, () => {
      // TODO: handle read message
      this.notificationService.info('You have read this message.');
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
