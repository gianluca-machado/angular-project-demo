import { Component } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { SettingService } from 'src/app/services/setting.service';
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
      onChange: (darkmode) => this.onChangeDarkMode(darkmode),
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
    private settingService: SettingService,
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

  onChangeDarkMode(darkmode: boolean) {
    this.themeService.changeTheme();
    this.settingService.save('darkmode', darkmode);
  }

  onChangeLanguage(language: string) {
    this.languageService.changeLanguage(language);
    this.settingService.save('language', language);
  }

  // eslint-disable-next-line class-methods-use-this
  getImageOption(value: string) {
    return `./assets/images/${value}.png`;
  }
}
