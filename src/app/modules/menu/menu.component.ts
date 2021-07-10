import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  public isCollapsed = false;

  public menus = [
    {
      route: 'dashboard',
      title: 'Dashboard',
      selected: true,
      icon: {
        nzType: 'dashboard',
        nzTheme: 'outline',
      }
    },
    {
      route: 'login',
      title: 'Sair',
      selected: false,
      icon: {
        nzType: 'logout',
        nzTheme: 'outline',
      }
    }
  ];

  /**
   * @ignore
   */
  constructor(
    private router: Router,
  ) { }

  /**
   * @ignore
   */
  ngOnInit() { }

  navigate(menu: any) {
    this.selectMenu(menu);
    this.router.navigate([menu.route]);
  }

  selectMenu(menu: any) {
    for (let i = 0; i < this.menus.length; i++) {
      this.menus[i].selected = false;
    }

    menu.selected = true;
  }

}
