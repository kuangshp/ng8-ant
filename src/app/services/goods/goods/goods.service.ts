import { ObjectType } from '@app/types';
import { Injectable } from '@angular/core';
import { BaseService } from '@app/services/base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoodsService extends BaseService {

  // 添加商品
  public createGoods$(params: ObjectType): Observable<any> {
    return this.post('admin/goods', params);
  }


  // 商品列表
  public goodsList$(params?: ObjectType): Observable<any> {
    return this.get('admin/goods', params);
  }

  // 删除商品
  public deleteGoods$(id: string): Observable<any> {
    return this.delete(`admin/goods/${id}`);
  }

  // 修改商品
  public modifyGoods$(id: string, data: ObjectType): Observable<any> {
    return this.patch(`admin/goods/${id}`, data);
  }
  // 根据id获取单个商品
  public goodsDeatils$(id: string): Observable<any> {
    return this.get(`admin/goods/${id}`);
  }
}
