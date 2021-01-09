import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Langs } from '../app-types';

const KEY_LANGUAGE = 'app_language';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  constructor(private translateService: TranslateService) {}

  init(): void {
    this.initLanguage();
  }

  changeLanguage(lang: string): Observable<any> {
    localStorage.setItem(KEY_LANGUAGE, lang);
    return this.translateService.use(lang);
  }

  getCurrentLanguage(): string {
    return this.translateService.currentLang;
  }

  translate(key: string | string[], param?: Object): Observable<string> {
    return this.translateService.get(key, param);
  }

  private findLanguage(langs: string[]): { label: string; value: string } {
    return Langs.find((lang) => {
      return langs.find((l) => lang.value.startsWith(l));
    });
  }

  private initLanguage(): void {
    let lang = this.findLanguage([
      localStorage.getItem(KEY_LANGUAGE),
      this.translateService.getBrowserLang(),
    ]);

    if (!lang) {
      lang = Langs[0];
    }

    this.translateService.use(lang.value);
  }
}
