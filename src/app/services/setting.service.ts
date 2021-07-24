import { Injectable } from '@angular/core';
import { ErrorHandleService } from './error-handle.service';
import { HttpRequestService } from './http-request.service';
import { LanguageService } from './language.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private setting: any = null;

  constructor(
    private httpRequestService: HttpRequestService,
    private errorHandleService: ErrorHandleService,
    private themeService: ThemeService,
    private languageService: LanguageService,
  ) { }

  async load() {
    try {
      this.setting = await this.httpRequestService.getRequestWithAuthorization('/setting');

      this.themeService.setThemeByLoad(this.setting.darkmode);
      this.languageService.setLanguageByLoad(this.setting.language);
    } catch (error) {
      this.errorHandleService.handleHttpError(error);
    }
  }

  async save(key: string, value: boolean | string) {
    try {
      this.setting[key] = value;
      this.setting = await this.httpRequestService.putRequestWithAuthorization('/setting', this.setting);
    } catch (error) {
      this.errorHandleService.handleHttpError(error);
    }
  }
}
