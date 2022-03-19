import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { app } from 'src/config';

@Injectable({
  providedIn: 'root',
})
export class TitleService extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot);
    this.setTitle(title);
  }

  public setTitle(title?: string, overwrite?: boolean): void {
    if (title && app.title !== title) {
      if (overwrite) {
        this.title.setTitle(title);
      } else {
        this.title.setTitle(`${app.title} - ${title}`);
      }
    } else {
      this.title.setTitle(app.title);
    }
  }
}
