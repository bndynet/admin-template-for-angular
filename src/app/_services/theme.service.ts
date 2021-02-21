import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { themes } from 'src/config';
import { ThemeEntity } from '../app-types';

export const KEY_THEME = 'app_theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  themeChanged = new EventEmitter<string>();

  isDark(): boolean {
    return document.body.classList.contains('is-dark');
  }

  changeTheme(themeKey: string): Observable<ThemeEntity> {
    const darkClassName = 'is-dark';

    document.body.classList.remove(darkClassName);
    themes.forEach((theme: ThemeEntity) => {
      document.body.classList.remove(theme.key);
    });

    const theme = themes.find((t) => t.key === themeKey);
    if (theme) {
      document.body.classList.add(theme.key);
      localStorage.setItem(KEY_THEME, theme.key);
      if (theme.isDark) {
        document.body.classList.add(darkClassName);
      }
    }
    this.themeChanged.emit(themeKey);
    return of(theme);
  }

  getThemeColor(themeKey: string, colorKey: string): string {
    return getComputedStyle(document.querySelector(':root')).getPropertyValue(
      `--${themeKey}--${colorKey}`
    );
  }

  getActiveThemeColor(colorKey: string): string {
    return (
      document.body.classList.value
        .split(' ')
        .map((className) => {
          return this.getThemeColor(className, colorKey);
        })
        .find((color) => !!color) || this.getThemeColor('', colorKey)
    );
  }
}
