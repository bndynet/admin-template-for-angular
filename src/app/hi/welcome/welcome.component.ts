import { Component, OnInit } from '@angular/core';
import { NotificationService, StatusService } from 'src/app/_services';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  private requesting = true;
  public pageLoading = false;

  constructor(
    private status: StatusService,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
  }

  toggleRequesting(): void {
    this.requesting = !this.requesting;
    if (this.requesting) {
      this.status.requesting();
    } else {
      this.status.requested();
    }
  }

  showInfo(msg: string): void {
    this.notification.info(msg);
  }
  showSuccess(msg: string): void {
    this.notification.success(msg);
  }
  showWarning(msg: string): void {
    this.notification.warn(msg);
  }
  showError(msg: string): void {
    this.notification.error(msg);
  }
}
