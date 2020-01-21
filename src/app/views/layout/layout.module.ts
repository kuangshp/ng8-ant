import { NgModule } from '@angular/core';

import { SharedModule } from '@app/module/shared/shared.module';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout.component';
import { TabsetComponent } from './tabset/tabset.component';


@NgModule({
  declarations: [LayoutComponent, HeaderComponent, TabsetComponent],
  imports: [
    LayoutRoutingModule,
    SharedModule,
  ],
})
export class LayoutModule { }
