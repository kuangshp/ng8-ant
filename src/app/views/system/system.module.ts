import { NgModule } from '@angular/core';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { UsersModule } from './users/users.module';


@NgModule({
  declarations: [SystemComponent],
  imports: [
    SystemRoutingModule,
    UsersModule,
  ]
})
export class SystemModule { }
