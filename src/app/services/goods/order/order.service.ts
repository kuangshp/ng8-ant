import { Injectable } from '@angular/core';
import { BaseService } from '@app/services/base/base.service';
import { Observable } from 'rxjs';
import { ObjectType } from '@app/types';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends BaseService {

  // 获取订单列表
  public orderList$(data: ObjectType): Observable<any> {
    return this.get('admin/order', data);
  }

  // 获取订单详情
  public orderDetail$(status: number, order_no: string): Observable<any> {
    return this.get(`admin/order/${status}/${order_no}`)
  }

  // 退单处理
  public rollbackOrder$(data: ObjectType): Observable<any> {
    return this.post('front/order/confirm_order', data);
  }
}
