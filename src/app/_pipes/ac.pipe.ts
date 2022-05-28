import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Menu } from '../app-types';
import { AuthService } from '../_services';

@Pipe({
  name: 'ac4menu$',
})
export class AC4MenuAsyncPipe implements PipeTransform {
  constructor(private authService: AuthService) {}

  transform(value: Menu, ...args: any[]): Observable<Menu | null> {
    return this.authService
      .hasMenu(value)
      .pipe(map((has) => (has ? value : null)));
  }
}
