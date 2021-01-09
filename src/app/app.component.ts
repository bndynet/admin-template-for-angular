import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  Router,
  RouterEvent,
} from '@angular/router';
import { protectedUrlPrefixes } from 'src/config';
import { AppService, I18nService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private app: AppService,
    private i18n: I18nService
  ) {
    this.i18n.init();

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationError) {
        this.app.notificaiton.error((event as NavigationError).error);
      }

      if (event instanceof NavigationEnd) {
        if (
          protectedUrlPrefixes.find((prefix) => event.url.startsWith(prefix))
        ) {
          this.app.auth.isAuthenticated().subscribe((val) => {
            if (!val) {
              this.router.navigate(['/logout']);
            }
          });
        }
      }
    });
  }

  ngOnInit(): void {}
}
