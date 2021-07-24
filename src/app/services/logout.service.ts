import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { StorageService } from './storage.service';
import { ThemeService } from './theme.service';

@Injectable({
  providedIn: 'root',
})
export class LogoutService {
  constructor(
    private storageService: StorageService,
    private themeService: ThemeService,
    private languageService: LanguageService,
  ) { }

  async logout() {
    await this.storageService.removeItem('login');
    await this.storageService.removeItem('first');

    await this.storageService.removeItem('theme');
    this.themeService.reset();

    await this.storageService.removeItem('language');
    this.languageService.reset();
  }
}
