import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// 获取环境配置项目
import { environment } from './../../environments/environment';
import { storage } from '@app/utils';
import { authToken } from '../config';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let url = req.url;
    if (url.indexOf('http://') < 0 || url.indexOf('https://') < 0) {
      url = environment.baseUrl + url;
    }
    // 过滤不需要token的请求
    if (this.ignoreToken(url)) {
      req = req.clone({ url });
    } else {
      // 如果本地获取不到token就重定向到登录页面
      if (storage.getItem(authToken)) {
        console.log('没token');
      } else {
        // 设置请求头
        req = req.clone({
          url,
          headers: req.headers
            .set('token', '11221')
            .set('token1', 'aaa')
            .set('Content-Type', 'application/json; charset=UTF-8')
        });
      }
    }

    return next.handle(req).pipe(
      tap(
        (event: any) => {
          if (event instanceof HttpResponse) {
            console.log(event);
            if (event.status >= 500) {
              // 跳转错误页面
            }
          }
        },
        error => {
          // token过期 服务器错误等处理
        }
      )
    );
  }

  /**
   * 忽视token的方法
   * @param url 当前的url地址
   */
  public ignoreToken(url: string): boolean {
    const ignoreToken = environment.ignoreToken;
    const urlList = url.split('/').filter(item => item);
    for (const currentUrl of urlList) {
      if (ignoreToken.includes(currentUrl)) {
        return true;
      } else {
        return false;
      }
    }
  }
}
