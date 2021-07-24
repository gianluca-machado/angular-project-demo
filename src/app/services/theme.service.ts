import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private theme = '';

  private storage_key: string = 'theme';

  constructor(
    private storageService: StorageService,
  ) { }

  async reset() {
    this.theme = '';
    this.setTheme();
  }

  async setDefaultTheme() {
    const storage_theme = await this.storageService.retrieve(this.storage_key);
    if (storage_theme) {
      this.theme = storage_theme;
    } else {
      this.storageService.store(this.storage_key, this.theme);
    }
    this.setTheme();
  }

  changeTheme() {
    this.theme = this.theme === 'dark' ? '' : 'dark';
    this.setTheme();
  }

  setThemeByLoad(darkmode) {
    this.theme = darkmode ? 'dark' : '';
    this.setTheme();
  }

  setTheme() {
    this.storageService.store(this.storage_key, this.theme);

    // theme url to which should be switched
    let themeUrl = './assets/themes/compact.css';
    if (this.theme === 'dark') {
      themeUrl = './assets/themes/dark.css';
    }

    // create new link element
    const newThemeElement = document.createElement('link') as HTMLLinkElement;

    // put the link into the document head
    document.head.appendChild(newThemeElement);

    // add the type to the link element
    newThemeElement.type = 'text/css';

    // add the rel to the link elmenent
    newThemeElement.rel = 'stylesheet';

    // listen the link load event
    newThemeElement.onload = () => {
      // get the theme link element
      const themeElements = document.querySelectorAll('link[theme-link]');

      // get all of the style elements and remove all of theme from the document
      themeElements.forEach((themeElement) => {
        // remove the prevoius theme styles from the document when the new theme styles already downloaded
        document.head.removeChild(themeElement);
      });

      // add attribute to the theme link element
      newThemeElement.setAttribute('theme-link', '');

      // remove the listener
      newThemeElement.onload = null;
    };

    newThemeElement.href = themeUrl;
  }

  getCurrentTheme() {
    return this.storageService.retrieve(this.storage_key);
  }
}
