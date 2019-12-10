import { NgModule } from '@angular/core';

import { ViewsRoutingModule } from './views-routing.module';
import { SystemModule } from './system/system.module';
import { LayoutModule } from './layout/layout.module';
// import { HomeModule } from './home/home.module';


@NgModule({
  declarations: [],
  imports: [
    ViewsRoutingModule,
    SystemModule,
    LayoutModule,
    // HomeModule
  ]
})
export class ViewsModule { }
