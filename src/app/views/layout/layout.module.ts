import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { TabsetComponent } from './tabset/tabset.component';


@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent, TabsetComponent],
  imports: [
    LayoutRoutingModule,
    SharedModule,
  ],
})
export class LayoutModule { }
