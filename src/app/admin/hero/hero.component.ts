import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-admin-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  public canBack: boolean;

  constructor(private router: Router) {
    this.router.events.subscribe((e: RouterEvent) => {
      if (e.url) {
        this.canBack = e.url.includes('heroes/');
      }
    });
  }
}
