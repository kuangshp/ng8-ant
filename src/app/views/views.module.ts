import { NgModule } from '@angular/core';

import { ViewsRoutingModule } from './views-routing.module';
import { LayoutModule } from './layout/layout.module';
import { ViewSharedModule } from './shared/view.shared.module';


@NgModule({
  declarations: [],
  imports: [
    ViewsRoutingModule,
    ViewSharedModule,
    LayoutModule,
  ]
})
export class ViewsModule { }
