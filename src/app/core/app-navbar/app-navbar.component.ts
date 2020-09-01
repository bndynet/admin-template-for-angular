import { Component, OnInit } from '@angular/core';
import { MessageEntity } from 'src/app/app-types';
import { MessageService } from 'src/app/_services';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.scss']
})
export class AppNavbarComponent implements OnInit {

  public messages: MessageEntity[];

  constructor(
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.messageService.getMessage().subscribe(
      res => {
        this.messages = res;
      }
    );
  }

  toggleMenu(): void {

  }
}
