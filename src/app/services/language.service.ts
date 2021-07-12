import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private language = 'PT-BR';

  private storage_key: string = 'language';

  constructor(
    private storageService: StorageService,
  ) { }

  async setDefaultLanguage() {
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
  }

  getCurrentLanguage() {
    return this.storageService.retrieve(this.storage_key);
  }
}
