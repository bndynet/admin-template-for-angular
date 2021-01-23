import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/app-types';
import { AppService } from 'src/app/_services';

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

  constructor(private router: Router, private app: AppService) {
    if (this.app.auth) {
      this.app.auth.isAuthenticated().subscribe((val) => {
        if (val) {
          this.router.navigate(['/admin']);
        }
      });
    }
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

    const username = this.form.get('name').value;
    const password = this.form.get('password').value;
    const authHandler = this.app.auth.authHandler;

    this.logging = true;
    this.alertMessage = '';
    authHandler
      .login(username, password)
      .then((u: UserInfo) => {
        // authHandler.setToken({ accessToken: u.accessToken });
        // authHandler.setUser(u);
        this.router.navigate(['/admin']);
      })
      .catch((error) => {
        this.alertMessage = error.message;
      })
      .finally(() => {
        this.logging = false;
      });
  }
}
