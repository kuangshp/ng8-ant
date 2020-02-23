import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  /**
   * @Author: 水痕
   * @Date: 2020-01-23 21:09:32
   * @LastEditors: 水痕
   * @Description: 登录请求
   * @param {type}
   * @return:
   */
  public $loginApi(data: { username: string, password: string }): Observable<any> {
    return this.post('/login', data);
  }
}
