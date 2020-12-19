import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule, Provider } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { environment } from 'src/environments/environment';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AuthType, Langs } from './app-types';
import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { httpInterceptorProviders } from './_interceptors';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.oauth.authorizationUrl,
        realm: environment.oauth.realm,
        clientId: environment.oauth.clientId,
      },
      initOptions: {
        onLoad: 'login-required', //'check-sso' or 'login-required',
        enableLogging: !environment.production,
        checkLoginIframe: false,
        // silentCheckSsoRedirectUri:
        //   window.location.origin + '/assets/silent-check-sso.html',
      },
      loadUserProfileAtStartUp: true,
      enableBearerInterceptor: true,
      bearerExcludedUrls: ['/assets'],
    });
}

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/json/', '.json');
}

const providers: Provider[] = [httpInterceptorProviders];
if (environment.authType === AuthType.Keycloak) {
  console.debug(environment);
  providers.splice(0, 0, {
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  });
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      defaultLanguage: Langs[0].value,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    KeycloakAngularModule,
    PublicModule,
    AdminModule,
  ],
  providers,
  bootstrap: [AppComponent],
})
export class AppModule {}
