import { NgModule } from '@angular/core';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';


@NgModule({
  declarations: [SystemComponent],
  imports: [
    SystemRoutingModule,
  ]
})
export class SystemModule { }
