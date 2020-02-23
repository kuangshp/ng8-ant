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
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd';

@Injectable()
export class ParamInterceptor implements HttpInterceptor {
  private baseUrl: string;
  constructor (
    private readonly router: Router,
    private readonly modalService: NzModalService
  ) {
    this.baseUrl = environment.baseUrl
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // 处理url地址的问题
    let url = this._url(req.url);
    // 过滤不需要token的请求
    if (this.ignoreToken(req.url)) {
      req = req.clone({ url });
    } else {
      // 如果本地获取不到token就重定向到登录页面
      if (!storage.getItem(authToken)) {
        console.log('没token跳转到登录页面');
        this.router.navigateByUrl('/login');
      } else {
        // 上传文件的时候只能加token
        if (url.includes('upload_image')) {
          req = req.clone({
            url,
            headers: req.headers
              .set('token', JSON.parse(storage.getItem(authToken)))
          })
        } else {
          // 设置请求头
          req = req.clone({
            url,
            headers: req.headers
              .set('token', JSON.parse(storage.getItem(authToken)))
              .set('Content-Type', 'application/json; charset=UTF-8')
          });
        }

      }
    }
    return next.handle(req).pipe(
      tap(
        (event: any) => {
          if (event instanceof HttpResponse) {
            const status = event.status;
            if (status >= 200 && status < 300) {
              console.log('请求成功');
            }
          }
        },
        error => {
          // token过期 服务器错误等处理
          const status = error.status;
          if (status >= 500) {
            this.modalService.error({
              nzTitle: '<h4>错误提示</h4>',
              nzContent: '服务器端错误,请求重新刷新页面',
              nzOnOk: () => window.location.reload(),
            });
          } else if (status == 401) {
            this.modalService.confirm({
              nzTitle: '<h4>权限提示</h4>',
              nzContent: '<b>当前操作没权限,是否跳转到主页</b>',
              nzOnOk: () => this.router.navigateByUrl('/home')
            });
          } else if (status == 429) {
            this.modalService.warning({
              nzTitle: '访问受限提示',
              nzContent: '你访问过于频繁,等会访问',
            });
          }
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

  /**
   * @Author: 水痕
   * @Date: 2020-01-21 20:40:48
   * @LastEditors: 水痕
   * @Description: 封装一个处理url地址的方法
   * @param {type}
   * @return:
   */
  private _url(url: string): string {
    if (url.startsWith('http') || url.startsWith('https')) {
      return url;
    } else {
      /**
       * 处理url拼接问题
       * 1.如果baseUrl带了/结尾,url也带了/开头就截取一个
       * 2.如果baseUrl不带/结尾,url也不带/结尾就加一个
       * 3.如果都不是就直接返回
       */
      if (/.*?\/$/.test(this.baseUrl) && /^\/.*/.test(url)) {
        return `${this.baseUrl}${url.substring(1, url.length)}`;
      } else if (!/.*?\/$/.test(this.baseUrl) && !/^\/.*/.test(url)) {
        return `${this.baseUrl}/${url}`
      } else {
        return `${this.baseUrl}${url}`;
      }
    }
  }
}
