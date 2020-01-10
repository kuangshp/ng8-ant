import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoggerService } from './tools/logger/logger.service';
import { RequestService } from './tools/request/request.service';
import { ParamInterceptor } from '../interceptors/param.interceptor';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    LoggerService,
    RequestService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ParamInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true
    }
  ], // 定义的服务
})
export class ServiceModule { }
