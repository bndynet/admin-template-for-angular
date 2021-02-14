import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html',
  styleUrls: ['./dev.component.scss'],
})
export class DevComponent implements OnInit, OnDestroy {
  public title: string;
  public currentTabIndex: number = 0;
  public compFiles: {
    tag: string;
    lang: string;
    name: string;
    code: string;
  }[] = [];
  public showCode = true;
  public loadingCode: boolean;

  private fileTagLangMapping = {
    TS: 'javascript',
    HTML: 'xml',
    SCSS: 'css',
  };
  private subs = new Subscription();

  constructor(private router: Router, private http: HttpClient) {
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        const compName = url.split('/')[url.split('/').length - 1];
        const compPath = `${url.replace(
          '/admin/',
          'assets/'
        )}/${compName}.component`;

        this.title = compName.toUpperCase().replace('-', ' ');

        if (!event.url.includes('examples')) {
          this.showCode = false;
          return;
        }

        this.showCode = true;
        this.compFiles = [];
        Object.keys(this.fileTagLangMapping).forEach((key) => {
          this.compFiles.push({
            tag: key,
            lang: this.fileTagLangMapping[key],
            name: `${compPath}.${key.toLowerCase()}`,
            code: '',
          });
        });
        this.currentTabIndex = 0;
        this.changeCompFile({ index: this.currentTabIndex, tab: null });
      }
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  changeCompFile(event: MatTabChangeEvent): void {
    const compFile = this.compFiles[event.index];
    if (!compFile.code) {
      this.subs.add(
        this.http
          .get(compFile.name, { responseType: 'text' })
          .pipe(
            tap(() => {
              this.loadingCode = true;
            }),
            finalize(() => {
              this.loadingCode = false;
            })
          )
          .subscribe((code) => {
            compFile.code = code;
          })
      );
    }
  }
}
