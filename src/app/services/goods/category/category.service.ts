import { Injectable } from '@angular/core';
import { BaseService } from '@app/services/base/base.service';
import { ObjectType } from '@app/types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  // 分类列表
  public categoryList$(params?: ObjectType): Observable<any> {
    return this.get('admin/category', params);
  }

  // 创建分类
  public createCategory$(data: ObjectType): Observable<any> {
    return this.post('admin/category', data);
  }

  // 删除分类
  public deleteCategory$(id: string): Observable<any> {
    return this.delete(`admin/category/${id}`);
  }

  // 修改分类
  public modifyCategory$(id: string, data: ObjectType): Observable<any> {
    return this.patch(`admin/category/${id}`, data);
  }
}
