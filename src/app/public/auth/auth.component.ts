import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/app-types';
import { AppService } from 'src/app/_services';
import { OAuth, TokenInfo } from 'src/app/_services/oauth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  message: string;

  constructor(private router: Router, private app: AppService) {}

  ngOnInit(): void {
    const oauth = new OAuth(environment.oauth);

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
