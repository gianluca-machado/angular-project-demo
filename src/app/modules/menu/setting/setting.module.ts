import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { SettingRoutingModule } from './setting-routing.module';
import { SettingComponent } from './setting.component';

@NgModule({
  declarations: [
    SettingComponent,
  ],
  imports: [
    SettingRoutingModule,
    SharedModule,
  ],
})
export class SettingModule { }
