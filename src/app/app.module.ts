// modules
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';

// components
import { AppComponent } from './app.component';

// services
import { CustomizeMessageService } from './services/customize-message.service';
import { HttpRequestService } from './services/http-request.service';
import { StorageService } from './services/storage.service';
import { TokenService } from './services/token.service';
import { UtilsService } from './services/utils.service';

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
  ],
  providers: [
    CustomizeMessageService,
    HttpRequestService,
    StorageService,
    TokenService,
    UtilsService,
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
