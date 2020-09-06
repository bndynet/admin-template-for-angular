import { Component, OnInit } from '@angular/core';
import { MessageEntity, UserEntity } from 'src/app/app-types';
import { AuthService, EventsService, MessageService } from 'src/app/_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {

  public messages: MessageEntity[];
  public userInfo: UserEntity;

  constructor(
    private auth: AuthService,
    private events: EventsService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
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
}
