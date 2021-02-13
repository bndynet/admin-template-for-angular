import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
// codemirror
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/xml/xml';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.group('APP: Environment');
console.log(environment);
console.groupEnd();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
