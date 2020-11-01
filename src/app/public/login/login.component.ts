import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserEntity } from 'src/app/app-types';
import { AppService } from 'src/app/_services';
import { getLocalUrl } from 'src/utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public logging: boolean;
  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private app: AppService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  login(): void {
    if (this.logging || !this.form.valid) {
      return;
    }

    const username = this.form.get('name').value;
    const password = this.form.get('password').value;

    this.logging = true;

    this.http
      .get(getLocalUrl(`/assets/user.json`))
      .subscribe((u: UserEntity) => {
        const user = (username
          ? {
              ...u,
              ...{ name: username, token: password },
            }
          : u) as UserEntity;
        this.app.auth.setToken(password);
        this.app.auth.setUser(user);
        this.logging = false;
        this.router.navigate(['/admin']);
      });
  }
}
