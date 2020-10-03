import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { AppContentSidebarComponent } from 'src/app/core/app-content-sidebar/app-content-sidebar.component';
import { NotificationService } from 'src/app/_services';
import { AppService } from 'src/app/_services/app.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent implements OnInit {

  public heroes: any[] = [];
  public activedHero: any;
  public saving = false;

  @ViewChild('contentSidebar') contentSidebarRef: AppContentSidebarComponent;

  constructor(
    private http: HttpClient,
    private router: Router,
    private app: AppService,
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
    this.saving = true;
    this.http.get(`/assets/user.json`).pipe(delay(3000)).subscribe(() => {
      this.saving = false;

      const index = this.heroes.findIndex( h => h.id === this.activedHero.id);
      this.heroes[index] = Object.assign({}, this.activedHero);
      this.activedHero = null;
      this.notification.success('Save Successfully.');
    });
  }

  remove(hero: any): void {
    this.app.deleteConfirm(() => {
      alert('ok');
    });
  }

  onClosedContentSidebar(): void {
    this.activedHero = null;
  }
}
