import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import { AuthType, UserInfo } from 'src/app/app-types';
import { AppService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userInfo: UserInfo;
  isLoggingIn: boolean;
  isOAuth2: boolean;

  private subs = new Subscription();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private app: AppService,
    private oauthService: OAuthService
  ) {
    this.isOAuth2 = environment.authType === AuthType.OAuth;
  }

  ngOnInit(): void {
    const locationSearch = window.location.search;
    if (locationSearch.includes('code=')) {
      this.isLoggingIn = true;
    }

    this.subs.add(
      this.route.queryParamMap.subscribe((map: ParamMap) => {
        if (map.has('code')) {
          this.isLoggingIn = true;
        }

        // e.x. http://127.0.0.1:9000/?error=access_denied
        if (map.has('error')) {
          this.router.navigate(['/error'], {
            queryParams: {
              title: map.get('error'),
              description: map.keys
                .map((key) => `${key}: ` + map.getAll(key).join(','))
                .join('<br />'),
            },
          });
        }
      })
    );

    this.subs.add(
      this.app.auth.isDoneAuth().subscribe((done: boolean) => {
        this.isLoggingIn = !done;
      })
    );

    this.subs.add(
      this.app.auth.getUser().subscribe((user) => {
        this.userInfo = user;
      })
    );

    // This would directly (w/o user interaction) redirect the user to the
    // login page if they are not already logged in.
    /*
        this.oauthService.loadDiscoveryDocumentAndTryLogin().then(_ => {
            if (!this.oauthService.hasValidIdToken() || !this.oauthService.hasValidAccessToken()) {
              this.oauthService.initImplicitFlow('some-state');
            }
        });
    */
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  login(): void {
    this.oauthService.initImplicitFlow();
  }

  loginWithUsername(): void {
    this.router.navigate(['/login']);
  }

  gotoAdmin(): void {
    this.router.navigate(['/admin']);
  }
}
