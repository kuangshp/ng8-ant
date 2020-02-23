import { SharedModule } from './../module/shared/shared.module';
import { NgModule } from '@angular/core';

import { ViewsRoutingModule } from './views-routing.module';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    ViewsRoutingModule,
    ComponentsModule,
    LayoutModule,
  ]
})
export class ViewsModule { }
