import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {
  public darkmode = false;

  public items: any[] = [
    {
      type: 'darkmode',
      avatar: './assets/images/night-mode.png',
      description: 'Change system theme',
      title: 'Dark Mode',
      value: false,
      actionType: 'switch',
      onChange: () => this.onChangeDarkMode(),
    },
    {
      type: 'language',
      avatar: './assets/images/languages.png',
      description: 'Change system language',
      title: 'Language',
      options: [
        {
          label: 'Português - Brasil',
          value: 'PT-BR',
        },
        {
          label: 'English',
          value: 'EN',
        },
      ],
      value: 'PT-BR',
      actionType: 'select',
      class: 'fix-virtual-scrolling-height',
      onChange: () => this.onChangeLanguage(),
    },
  ];

  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    // init dark mode value
    const item = this.items.find((o) => o.type === 'darkmode');
    item.value = this.themeService.getCurrentTheme() === 'dark';
  }

  onChangeDarkMode() {
    this.themeService.changeTheme();
  }

  // eslint-disable-next-line class-methods-use-this
  onChangeLanguage() {
    console.log('onChangeLanguage');
  }

  // eslint-disable-next-line class-methods-use-this
  getImageOption(value: string) {
    return `./assets/images/${value}.png`;
  }
}
