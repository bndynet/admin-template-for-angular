import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { protectedUrlPrefixes } from 'src/config';
import { onRouteChanged, onRouteChanging } from './_interceptors';
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
    private i18n: I18nService,
    private oauthService: OAuthService
  ) {
    this.app.init();
    this.i18n.init();

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationError) {
        this.app.notificaiton.error((event as NavigationError).error);
      }

      if (event instanceof NavigationStart) {
        onRouteChanging(event, this.app);
      }

      if (event instanceof NavigationEnd) {
        onRouteChanged(event, this.app);
        if (
          protectedUrlPrefixes.find((prefix) => event.url.startsWith(prefix))
        ) {
          // this.app.auth.isAuthenticated().subscribe((val) => {
          //   if (!val) {
          //     this.router.navigate(['/logout']);
          //   }
          // });
        }
      }
    });
  }

  ngOnInit(): void {}
}
