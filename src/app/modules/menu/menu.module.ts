import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    MenuRoutingModule,
    SharedModule,
  ],
})
export class MenuModule { }
