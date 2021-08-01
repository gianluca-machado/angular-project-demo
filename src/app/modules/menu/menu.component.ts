import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogoutService } from 'src/app/services/logout.service';
import { SettingService } from 'src/app/services/setting.service';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public loadingMenu = true;

  public isCollapsed = false;

  public showNotification = false;

  public hasNotification = true;

  public user: any;

  public menus: any[] = [];

  public fake_menu: any[] = [null, null, null];

  /**
   * @ignore
   */
  constructor(
    private router: Router,
    private logoutService: LogoutService,
    private settingService: SettingService,
    private menuService: MenuService,
  ) { }

  async ngOnInit() {
    await this.settingService.load();

    this.menus = await this.menuService.getMenus();
    this.loadingMenu = false;

    this.user = await this.menuService.getUser();

    this.selectMenuByUrl();
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

  openNotification(): void {
    this.showNotification = true;
  }

  closeNotification(): void {
    this.showNotification = false;
  }
}
