import { NgModule } from '@angular/core';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { UsersModule } from '../shared/view.shared.module';


@NgModule({
  declarations: [SystemComponent],
  imports: [
    SystemRoutingModule,
  ]
})
export class SystemModule { }
