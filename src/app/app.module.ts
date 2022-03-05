import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { FormModule } from 'src/libs/form';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { Langs } from './app-types';
import { AppComponent } from './app.component';
import { GlobalErrorHandler } from './core/global-error-handler';
import { PublicModule } from './public/public.module';
import { httpInterceptorProviders } from './_interceptors';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/json/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    FormModule,
    TranslateModule.forRoot({
      defaultLanguage: Langs[0].value,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    OAuthModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    PublicModule,
    AdminModule,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: OAuthStorage, useValue: localStorage },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
