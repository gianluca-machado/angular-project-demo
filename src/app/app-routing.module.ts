import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'new',
    loadChildren: () => import('./modules/new/new.module').then((m) => m.NewModule),
  },
  {
    path: 'menu',
    loadChildren: () => import('./modules/menu/menu.module').then((m) => m.MenuModule),
  },
  {
    path: '**',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
