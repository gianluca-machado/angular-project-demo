import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private language = 'pt-BR';

  private storage_key: string = 'language';

  constructor(
    private storageService: StorageService,
    private translate: TranslateService,
  ) { }

  async setDefaultLanguage() {
    this.translate.setDefaultLang('pt-BR');

    const storage_language = await this.storageService.retrieve(this.storage_key);
    if (storage_language) {
      this.language = storage_language;
    } else {
      this.storageService.store(this.storage_key, this.language);
    }

    this.setLanguage();
  }

  changeLanguage(language: string) {
    this.language = language;
    this.setLanguage();
  }

  setLanguage() {
    this.storageService.store(this.storage_key, this.language);
    this.translate.use(this.language);
  }

  getCurrentLanguage() {
    return this.storageService.retrieve(this.storage_key);
  }

  static createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

  static LoaderForRoot() {
    return {
      loader: this.GetLoader(),
    };
  }

  static LoaderForChild() {
    return {
      loader: this.GetLoader(),
      isolate: false,
    };
  }

  static GetLoader() {
    return {
      provide: TranslateLoader,
      useFactory: (LanguageService.createTranslateLoader),
      deps: [HttpClient],
    };
  }

  get(key: string, params: any = {}): Promise<string> {
    return new Promise<string>((resolve) => {
      this.translate.get('create_account.form.agreement_warning', params).subscribe((text) => {
        resolve(text);
      });
    });
  }
}
