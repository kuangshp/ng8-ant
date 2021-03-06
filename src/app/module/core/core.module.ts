import { NgModule, SkipSelf, Optional } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ViewsModule } from '../../views/views.module';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../../app-routing.module';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
// 配置 angular i18n
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { AuthGuard } from '../../auth/auth.guard';
import { ServiceModule } from '../service/service.module';
registerLocaleData(zh);

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceModule,
    ViewsModule,
    SharedModule,
    AppRoutingModule,
  ],
  exports: [
    AppRoutingModule,
    SharedModule,
  ],
  providers: [AuthGuard, { provide: NZ_I18N, useValue: zh_CN }],
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 只能被appModule引入');
    }
  }
}
