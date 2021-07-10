import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'setting',
        loadChildren: () => import('./setting/setting.module').then((m) => m.SettingModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule { }
