import { NgModule } from '@angular/core';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { SharedModule } from 'src/app/shared/shared.module';

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
