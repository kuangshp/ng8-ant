import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ObjectType } from '@app/types';
import { CategoryService } from '@app/services/goods/category/category.service';
import { NzMessageService, NzConfigService, NzModalService } from 'ng-zorro-antd';
import { EditCategoryComponent } from './modal/edit-category/edit-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryListData: any[] = [];
  // 数据加载中
  loadData: boolean = true;
  // 总共多少条数据
  tableTotal: number = 0;
  // 当前页码
  pageNumber: number = 1;
  // 默认一页显示多少条
  pageSize: number = 10;
  // 页码可以选择一次展示多少条数据
  nzPageSizeOptions: number[] = [10, 20, 30, 40, 50];
  // 设置表格滚动条
  tableScroll: object = {
    x: '100%',
    y: document.body.offsetHeight - 220
  }


  constructor (
    private readonly modalService: NzModalService,
    private readonly message: NzMessageService,
    private readonly categoryService: CategoryService,
    private readonly nzModalService: NzModalService,
  ) { }

  ngOnInit() {
    this.initCategoryList();
  }

  // 获取分类列表
  initCategoryList(params?: ObjectType): void {
    this.categoryService.categoryList$(params).subscribe({
      next: (response) => {
        const { code, message, result } = response;
        if (Object.is(code, 0)) {
          this.categoryListData = result.data;
          this.tableTotal = result.total;
          this.loadData = false;
        } else {
          this.message.create('error', message);
        }
      }
    })
  }

  // 添加商品分类
  addCategory(): void {
    this.openMdal('添加商品分类', {})
  }

  // 编辑分类
  editCategory(data: any): void {
    this.openMdal('修改分类', data);
  }

  openMdal(title: string, data?: ObjectType): void {
    const modal = this.nzModalService.create({
      nzTitle: title,
      nzContent: EditCategoryComponent,
      nzComponentParams: {
        rowData: data,
      },
      nzOnOk: async (componentInstance) => { // 保存
        const result = await componentInstance.handleOk();
        if (result) {
          this.initCategoryList();
          // 销毁弹框
          modal.destroy();
        }
        return result;
      },
    })
  }
  // 删除分类
  deleteRowData(data: any): void {
    this.categoryService.deleteCategory$(data.id).subscribe(data => {
      const { code, message, result } = data;
      if (Object.is(code, 0)) {
        this.message.create('success', message);
        this.initCategoryList();
      } else {
        this.message.create('error', message);
      }
    })
  }

  // 页码改变触发事件
  changePageNumber(pageNumber: number): void {
    this.loadData = true;
    this.initCategoryList({ pageNumber })
  }

  // 页数改变触发事件
  changePageSize(pageSize: number): void {
    this.loadData = true;
    this.pageSize = pageSize;
    this.initCategoryList({ pageSize })
  }
}
