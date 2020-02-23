import { Component, OnInit } from '@angular/core';
import { GoodsService } from '@app/services/goods/goods/goods.service';
import { ObjectType } from '@app/types';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { CategoryService } from '@app/services/goods/category/category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  categoryIds: any;
  goodsList: any[] = [];
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
    x: '165%',
    y: document.body.offsetHeight - 220
  }
  // 分类的过滤条件
  searchParams: ObjectType = {};
  searchValue = '';
  listOfCategory: any[] = [];
  listOfStatus: any[] = [{ text: '可用', value: '1' }, { text: '禁用', value: '0' }];
  constructor (
    private readonly router: Router,
    private readonly message: NzMessageService,
    private readonly goodsService: GoodsService,
    private readonly categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.initGoodsList();
    this.initCategoryList();
  }

  // 过滤数据
  filterCategory(categoryIds: string[]): void {
    let ids = [];
    if (!categoryIds.length) {
      ids = this.listOfCategory.map(item => item.value);
    } else {
      ids = categoryIds;
    }
    this.searchParams = Object.assign(this.searchParams, {
      categoryIds: ids.join(','),
      status,
    })
    this.initGoodsList(this.searchParams);
  }
  filterStatus(status: string): void {
    this.searchParams = Object.assign(this.searchParams, {
      status,
    })
    this.initGoodsList(this.searchParams);
  }
  filter(categoryIds: string[], status: string): void {
    console.log(categoryIds, status);
    this.searchParams = Object.assign(this.searchParams, {
      categoryIds: categoryIds ? categoryIds.join(',') : '',
      status,
    })
    this.initGoodsList(this.searchParams);
  }
  // 重置
  reset(): void {
    this.searchValue = '';
    this.searchParams = Object.assign(this.searchParams, {
      title: '',
    })
    this.initGoodsList(this.searchParams);
  }
  // 搜索
  search(): void {
    this.searchParams = Object.assign(this.searchParams, {
      title: this.searchValue,
    })
    this.initGoodsList(this.searchParams);
  }

  initGoodsList(params?: ObjectType): void {
    this.goodsService.goodsList$(params).subscribe(data => {
      const { code, message, result } = data;
      if (Object.is(code, 0)) {
        this.goodsList = result.data;
        this.tableTotal = result.total;
        this.loadData = false;
      } else {
        console.log(message);
      }
    })
  }

  // 获取全部的分类
  initCategoryList(): void {
    this.categoryService.categoryList$({ pageSize: 1000 }).subscribe(data => {
      const { code, message, result } = data;
      if (Object.is(code, 0)) {
        this.listOfCategory = result.data.map(item => {
          return {
            text: item.title,
            value: item.id,
          }
        });
      }
    })
  }

  addGoods(): void {
    this.router.navigateByUrl('/goods/add');
  }
  // 编辑商品
  editGoods(data: any): void {
    console.log(data);
    this.router.navigate(['/goods/edit', data.uuid]);
  }
  // 删除商品
  deleteRowData(data: any): void {
    this.goodsService.deleteGoods$(data.id).subscribe(data => {
      const { code, message, result } = data;
      if (Object.is(code, 0)) {
        this.message.create('success', message);
        this.initGoodsList();
      } else {
        this.message.create('error', message);
      }
    })
  }
  // 页码改变触发事件
  changePageNumber(pageNumber: number): void {
    this.loadData = true;
    this.initGoodsList({ pageNumber })
  }

  // 页数改变触发事件
  changePageSize(pageSize: number): void {
    this.loadData = true;
    this.pageSize = pageSize;
    this.initGoodsList({ pageSize })
  }
}
