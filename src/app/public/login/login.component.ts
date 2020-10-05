import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public logging: boolean;

  constructor(
    private router: Router,
    private app: AppService,
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    if (this.logging) {
      return;
    }

    this.logging = true;
    this.app.login('', '').subscribe(() => {
      this.logging = false;
      this.router.navigate(['/admin']);
    });
  }
}
