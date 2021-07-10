import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  public isCollapsed = false;

  public menus = [
    {
      route: '/menu/dashboard',
      title: 'Dashboard',
      selected: true,
      icon: {
        nzType: 'dashboard',
        nzTheme: 'outline',
      },
    },
    {
      route: '/menu/setting',
      title: 'Setting',
      selected: false,
      icon: {
        nzType: 'setting',
        nzTheme: 'outline',
      },
    },
    {
      route: '/login',
      title: 'Logout',
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
  ) { }

  navigate(menu: any) {
    console.log(menu);

    this.selectMenu(menu);
    this.router.navigateByUrl(menu.route);
  }

  selectMenu(menu: any) {
    for (let i = 0; i < this.menus.length; i++) {
      this.menus[i].selected = false;
    }
    menu.selected = true;
  }
}
