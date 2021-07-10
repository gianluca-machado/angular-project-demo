// modules
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';

// components
import { AppComponent } from './app.component';

// services
import { HttpRequestService } from './services/http-request.service';
import { StorageService } from './services/storage.service';
import { TokenService } from './services/token.service';
import { UtilsService } from './services/utils.service';
import { ThemeService } from './services/theme.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    BrowserModule.withServerTransition({ appId: 'my-app' }),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
  ],
  providers: [
    HttpRequestService,
    StorageService,
    TokenService,
    UtilsService,
    ThemeService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
