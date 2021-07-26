import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComponent } from './menu.component';
import { MenuService } from './menu.service';

@NgModule({
  declarations: [
    MenuComponent,
  ],
  imports: [
    MenuRoutingModule,
    SharedModule,
  ],
  providers: [
    MenuService,
  ],
})
export class MenuModule { }
