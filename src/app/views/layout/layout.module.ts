import { NgModule } from '@angular/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { ContentComponent } from './content/content.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [LayoutComponent, HeaderComponent, SidebarComponent, ContentComponent],
  imports: [
    LayoutRoutingModule,
    SharedModule,
  ],
})
export class LayoutModule { }
