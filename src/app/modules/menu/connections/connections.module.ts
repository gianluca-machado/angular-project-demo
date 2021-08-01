import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConnectionsRoutingModule } from './connections-routing.module';
import { ConnectionsComponent } from './connections.component';

@NgModule({
  declarations: [
    ConnectionsComponent,
  ],
  imports: [
    ConnectionsRoutingModule,
    SharedModule,
  ],
})
export class ConnectionsModule { }
