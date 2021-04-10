import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/app-types';
import { AppService } from 'src/app/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  userInfo: UserInfo;
  isLoggingIn: boolean;

  private subs = new Subscription();

  constructor(
    private router: Router,
    private app: AppService,
    private oauthService: OAuthService
  ) {}

  ngOnInit(): void {
    const locationSearch = window.location.search;
    if (locationSearch.includes('code=')) {
      this.isLoggingIn = true;
    }

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
