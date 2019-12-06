import { NgModule } from '@angular/core';
import { LoggerService } from './logger.service';
import { RequestService } from './request.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
