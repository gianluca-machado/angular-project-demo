import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {
  public loading = true;

  public items: any[] = [
    {
      type: 'darkmode',
      avatar: './assets/images/night-mode.png',
      description: 'settings.darkmode.description',
      title: 'settings.darkmode.title',
      value: false,
      actionType: 'switch',
      onChange: () => this.onChangeDarkMode(),
    },
    {
      type: 'language',
      avatar: './assets/images/languages.png',
      description: 'settings.language.description',
      title: 'settings.language.title',
      options: [
        {
          label: 'Português - Brasil',
          value: 'pt-BR',
        },
        {
          label: 'English',
          value: 'en',
        },
      ],
      value: 'pt-BR',
      actionType: 'select',
      class: 'fix-virtual-scrolling-height',
      onChange: (language) => this.onChangeLanguage(language),
    },
  ];

  constructor(
    private themeService: ThemeService,
    private languageService: LanguageService,
  ) { }

  async ngOnInit() {
    // init dark mode value
    const darkmode = this.items.find((o) => o.type === 'darkmode');
    darkmode.value = await this.themeService.getCurrentTheme() === 'dark';

    // init language value
    const language = this.items.find((o) => o.type === 'language');
    language.value = await this.languageService.getCurrentLanguage();

    this.loading = false;
  }

  onChangeDarkMode() {
    this.themeService.changeTheme();
  }

  // eslint-disable-next-line class-methods-use-this
  onChangeLanguage(language) {
    this.languageService.changeLanguage(language);
  }

  // eslint-disable-next-line class-methods-use-this
  getImageOption(value: string) {
    return `./assets/images/${value}.png`;
  }
}
