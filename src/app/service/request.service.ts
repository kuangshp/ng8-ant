import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface IobjectType {
  [propsName: string]: any;
}
@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private readonly http: HttpClient) { }

  /**
   * 封装一个统一的get请求方法
   * @param url: url地址
   * @param options:配置参数
   */
  public get(
    url: string,
    options?: {
      params?: IobjectType;
      headers?: IobjectType;
      responseType?: any;
    }
  ): Observable<any> {
    const { params, headers, responseType } = options || {
      params: {},
      headers: {},
      responseType: 'json'
    };
    const $params = new HttpParams({ fromObject: params });
    const $headers = new HttpHeaders(headers);
    return this.http.get(url, {
      headers: $headers,
      params: $params,
      responseType
    });
  }

  /**
   * 封装一个put提交数据
   * @param url url地址
   * @param body 请求体
   * @param options 附属内容
   */
  public put(
    url: string,
    body: any | null,
    options?: {
      params?: IobjectType;
      headers?: IobjectType;
    }
  ): Observable<any> {
    const { params, headers } = options || {
      params: {},
      headers: {}
    };
    const $params = new HttpParams({ fromObject: params });
    const $headers = new HttpHeaders(headers);
    return this.http.put(url, body, {
      headers: $headers,
      params: $params
    });
  }

  /**
   * patch请求方法
   * @param url url地址
   * @param body 请求体
   * @param options 附属条件
   */
  public patch(
    url: string,
    body: any | null,
    options?: {
      params?: IobjectType;
      headers?: IobjectType;
    }
  ): Observable<any> {
    const { params, headers } = options || { params: {}, headers: {} };
    const $params = new HttpParams({ fromObject: params });
    const $headers = new HttpHeaders(headers);
    return this.http.patch(url, body, {
      headers: $headers,
      params: $params
    });
  }

  /**
   * post请求的方法
   * @param url url地址
   * @param body 请求体
   * @param options 附属条件
   */
  public post(
    url: string,
    body: any | null,
    options?: {
      params?: IobjectType;
      headers?: IobjectType;
    }
  ): Observable<any> {
    const { params, headers } = options || { params: {}, headers: {} };
    const $params = new HttpParams({ fromObject: params });
    const $headers = new HttpHeaders(headers);
    return this.http.post(url, body, {
      headers: $headers,
      params: $params
    });
  }

  /**
   * 删除数据的方法
   * @param url url地址
   * @param options 附属条件
   */
  public delete(
    url: string,
    options?: {
      params?: IobjectType;
      headers?: IobjectType;
    }
  ): Observable<any> {
    const { params, headers } = options || { params: {}, headers: {} };
    const $params = new HttpParams({ fromObject: params });
    const $headers = new HttpHeaders(headers);
    return this.http.delete(url, {
      headers: $headers,
      params: $params
    });
  }
}
