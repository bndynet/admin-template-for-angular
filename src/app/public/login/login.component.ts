import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/_services';

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

  constructor(private router: Router, private app: AppService) {}

  ngOnInit(): void {}

  login(): void {
    if (this.logging || !this.form.valid) {
      return;
    }

    this.logging = true;
    this.app
      .login(this.form.get('name').value, this.form.get('password').value)
      .subscribe(() => {
        this.logging = false;
        this.router.navigate(['/admin']);
      });
  }
}
