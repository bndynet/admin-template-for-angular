import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthType, UserInfo } from 'src/app/app-types';
import { AppService } from 'src/app/_services';
import { AuthOAuthHandler } from 'src/app/_services/auth-oauth-handler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public logging: boolean;
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  public alertMessage: string;

  constructor(
    private router: Router,
    private app: AppService,
    private http: HttpClient
  ) {
    this.app.auth.isAuthenticated().subscribe((val) => {
      if (val) {
        this.router.navigate(['/admin']);
      }
    });
  }

  ngOnInit(): void {
    this.app.setTitle('Log in');
  }

  ngOnDestroy(): void {
    this.app.resetTitle();
  }

  login(): void {
    if (this.logging || !this.form.valid) {
      return;
    }

    this.app.auth.setAuthType(AuthType.CustomOAuth);

    const username = this.form.get('name').value;
    const password = this.form.get('password').value;
    const authHandler = this.app.auth.authHandler as AuthOAuthHandler;

    this.logging = true;
    this.alertMessage = '';

    environment
      .login(this.http, username, password)
      .pipe(
        finalize(() => {
          this.logging = false;
        })
      )
      .subscribe(
        (u: UserInfo) => {
          authHandler.setToken({ accessToken: u.accessToken });
          authHandler.setUser(u);
          this.router.navigate(['/admin']);
        },
        (error) => {
          this.alertMessage = error.message;
        }
      );
  }
}
