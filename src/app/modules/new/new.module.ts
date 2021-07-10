import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';

@NgModule({
  declarations: [
    NewComponent,
  ],
  imports: [
    SharedModule,
    NewRoutingModule,
  ],
})
export class NewModule { }
