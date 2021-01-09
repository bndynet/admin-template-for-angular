import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthType, roles, UserInfo } from 'src/app/app-types';
import { AppService } from 'src/app/_services';
import {
  AuthOAuthHandler,
  TokenInfo,
} from 'src/app/_services/auth-oauth-handler';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  message: string;

  constructor(private router: Router, private app: AppService) {}

  ngOnInit(): void {
    this.app.auth.setAuthType(AuthType.CustomOAuth);

    (this.app.auth.authHandler as AuthOAuthHandler)
      .checkAuth()
      .then((token: TokenInfo) => {
        // this.app.auth.setToken(token.accessToken);
        this.app.auth.authHandler.getUserInfo().then((u) => {
          const user: UserInfo = {
            name: u.name,
            avatar: u.avatar,
            roles: [roles.docs],
          };
          (this.app.auth.authHandler as AuthOAuthHandler).setUser(user);
          this.router.navigate(['/admin']);
        });
      })
      .catch((error) => {
        this.message = error;
      });
  }
}
