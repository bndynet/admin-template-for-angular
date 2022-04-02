import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterEvent,
} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { app } from 'src/config';
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
    private i18n: I18nService,
    private appService: AppService,
    private oauthService: OAuthService
  ) {
    this.appService.init();
    this.i18n.init();

    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationError) {
        this.appService.notificaiton.error((event as NavigationError).error);
      }

      if (event instanceof NavigationStart) {
        onRouteChanging(event, this.appService);
      }

      if (event instanceof NavigationEnd) {
        onRouteChanged(event, this.appService);
        if (
          app.protectedUrlPrefixes.find((prefix) =>
            event.url.startsWith(prefix)
          )
        ) {
          // this.appService.auth.isAuthenticated().subscribe((val) => {
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
