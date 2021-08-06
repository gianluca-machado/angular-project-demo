import { HttpClient, HttpHandler } from '@angular/common/http';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService, TranslateStore } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { StorageService } from './services/storage.service';
import { SharedModule } from './shared/shared.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [
        AppComponent,
      ],
      providers: [
        StorageService,
        TranslateService,
        TranslateStore,
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have as title angular-project-demo', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-project-demo');
  });
});
