import { Component } from '@angular/core';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
})
export class SettingComponent {
  public darkmode = false;

  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit() {
    this.darkmode = this.themeService.getCurrentTheme() === 'dark';
  }

  onChangeDarkMode() {
    this.themeService.changeTheme();
  }
}
