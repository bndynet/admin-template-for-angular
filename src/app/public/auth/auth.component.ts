import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/app-types';
import { AppService } from 'src/app/_services';
import { OAuth, TokenInfo } from 'src/app/_services/oauth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  message: string;

  constructor(private router: Router, private app: AppService) {}

  ngOnInit(): void {
    const oauth = new OAuth({
      clientId: '188c0da703',
      clientSecret: 'f3dd317369ae622113f0',
      authorizationUrl:
        'http://cloud.bndy.net/service-oauth/authorize?target=github',
      redirectUrl: 'http://localhost:8080/auth/callback',
      userProfileUrl: 'https://api.github.com/user',
      logoutUrl: 'https://github.com/logout',
    });

    this.app.auth.enableOAuth(oauth);

    oauth
      .checkAuth()
      .then((token: TokenInfo) => {
        this.app.auth.setToken(token.accessToken);
        oauth.getUserInfo().then((u) => {
          const user: UserEntity = {
            name: u.name,
            avatar: u.avatar_url,
            roles: ['role_doc'],
          };
          this.app.auth.setUser(user);
          this.router.navigate(['/admin']);
        });
      })
      .catch((error) => {
        this.message = error;
      });
  }
}
