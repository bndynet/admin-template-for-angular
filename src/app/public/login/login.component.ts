import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { UserEntity } from 'src/app/app-types';
import { AppService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

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
  ) {}

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
        (u: UserEntity) => {
          this.app.auth.setToken(u.accessToken);
          this.app.auth.setUser(u);
          this.router.navigate(['/admin']);
        },
        (error) => {
          this.alertMessage = error.message;
        }
      );
  }
}
