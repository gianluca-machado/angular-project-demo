// modules
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';

// components
import { AppComponent } from './app.component';

// services
import { HttpRequestService } from './services/http-request.service';
import { StorageService } from './services/storage.service';
import { UtilsService } from './services/utils.service';
import { ThemeService } from './services/theme.service';
import { LanguageService } from './services/language.service';
import { ErrorHandleService } from './services/error-handle.service';
import { TokenGuard } from './guards/token/token.guard';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserModule.withServerTransition({ appId: 'ecommerce-integrator-system' }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    TranslateModule.forRoot(LanguageService.LoaderForRoot()),
  ],
  providers: [
    HttpRequestService,
    StorageService,
    UtilsService,
    ThemeService,
    LanguageService,
    ErrorHandleService,
    TokenGuard,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
