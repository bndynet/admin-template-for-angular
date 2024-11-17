import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { delay } from 'rxjs/operators';
import { NotificationService } from 'src/app/_services';
import { AppService } from 'src/app/_services/app.service';
import { getLocalUrl, mockRequest } from 'src/utils';
import { ContentSidebarComponent } from '../../../../shared';

@Component({
  selector: 'app-examples-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  public heroes: any[] = [];
  public currentHero: any;
  public saving = false;
  public loading = false;
  public initializing = false;

  @ViewChild('contentSidebar') contentSidebarRef: ContentSidebarComponent;

  constructor(
    private http: HttpClient,
    private app: AppService,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.getHeroes(null);
  }

  getHeroes(event: PageEvent): void {
    if (event) {
      this.loading = true;
    } else {
      this.initializing = true;
    }
    this.http
      .get(getLocalUrl(`/assets/heroes.json?p=${event ? event.pageIndex : 0}`))
      .pipe(delay(2000))
      .subscribe((res: any[]) => {
        this.heroes = res;
        if (event) {
          this.loading = false;
        } else {
          this.initializing = false;
        }
      });
  }

  gotoDetail(id: number): void {
    this.currentHero = Object.assign(
      {},
      this.heroes.find((h) => h.id === id),
    );
  }

  save(): void {
    this.saving = true;
    mockRequest().subscribe(() => {
      this.saving = false;

      const index = this.heroes.findIndex((h) => h.id === this.currentHero.id);
      this.heroes[index] = Object.assign({}, this.currentHero);
      this.currentHero = null;
      this.notification.success('Save Successfully.');
    });
  }

  remove(hero: any): void {
    this.app.dialog.deleteConfirm(() => {
      alert('ok');
    });
  }

  onClosedContentSidebar(): void {
    this.currentHero = null;
  }
}
