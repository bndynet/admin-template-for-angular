import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/_services';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  public heroes: any[] = [];
  public activedHero: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notification: NotificationService,
  ) { }

  ngOnInit(): void {
    this.http.get(`/assets/heroes.json`).subscribe(
      (res: any[]) => {
        this.heroes = res;
      }
    );
  }

  gotoDetail(id: number): void {
    this.activedHero = Object.assign({}, this.heroes.find(h => h.id === id));
  }

  save(): void {
    const index = this.heroes.findIndex( h => h.id === this.activedHero.id);
    this.heroes[index] = Object.assign({}, this.activedHero);
    this.activedHero = null;
    this.notification.success('Save Successfully.');
  }
}
