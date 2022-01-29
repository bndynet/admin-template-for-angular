import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { AuthType } from 'src/app/app-types';
import { AppService } from 'src/app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public logging: boolean;
  public form: UntypedFormGroup = new UntypedFormGroup({
    name: new UntypedFormControl('', Validators.required),
    password: new UntypedFormControl('', Validators.required),
  });
  public alertMessage: string;

  private subs = new Subscription();

  constructor(private router: Router, private app: AppService) {
    if (this.app.auth && this.app.auth.getAuthType() === AuthType.Local) {
      this.subs.add(
        this.app.auth.isAuthenticated().subscribe((val) => {
          if (val) {
            this.router.navigate(['/admin']);
          }
        })
      );
    }
  }

  ngOnInit(): void {
    this.app.setTitle('Log in');
  }

  ngOnDestroy(): void {
    this.app.resetTitle();
    this.subs.unsubscribe();
  }

  login(): void {
    if (this.logging || !this.form.valid) {
      return;
    }

    const username = this.form.get('name').value;
    const password = this.form.get('password').value;
    const loginResult = this.app.auth.login('/admin', username, password);

    this.logging = true;
    this.alertMessage = '';

    if (loginResult) {
      this.subs.add(
        loginResult
          .pipe(
            catchError((error: { message: string }) => {
              this.alertMessage = error.message;
              throw error;
            }),
            finalize(() => {
              this.logging = false;
            })
          )
          .subscribe()
      );
    }
  }
}
