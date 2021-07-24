import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logout.service';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public isCollapsed = false;

  public menus = [
    {
      route: '/menu/dashboard',
      title: 'menu.item.dashboard',
      selected: true,
      icon: {
        nzType: 'dashboard',
        nzTheme: 'outline',
      },
    },
    {
      route: '/menu/setting',
      title: 'menu.item.settings',
      selected: false,
      icon: {
        nzType: 'setting',
        nzTheme: 'outline',
      },
    },
    {
      route: '/login',
      title: 'menu.item.logout',
      selected: false,
      icon: {
        nzType: 'logout',
        nzTheme: 'outline',
      },
    },
  ];

  /**
   * @ignore
   */
  constructor(
    private router: Router,
    private logoutService: LogoutService,
    private settingService: SettingService,
  ) { }

  async ngOnInit() {
    this.selectMenuByUrl();

    await this.settingService.load();
  }

  async navigate(menu: any) {
    console.log(menu);

    this.selectMenu(menu);

    this.router.navigateByUrl(menu.route);

    if (menu.route === '/login') {
      await this.logoutService.logout();
    }
  }

  selectMenu(menu: any) {
    this.clearMenuSelected();

    if (menu) {
      menu.selected = true;
    }
  }

  selectMenuByUrl() {
    const menu = this.menus.find((m) => m.route === this.router.url);
    this.selectMenu(menu);
  }

  clearMenuSelected() {
    for (let i = 0; i < this.menus.length; i++) {
      this.menus[i].selected = false;
    }
  }
}
