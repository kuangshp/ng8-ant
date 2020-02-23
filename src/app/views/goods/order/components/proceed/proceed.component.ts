import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app/services/goods/order/order.service';
import { ObjectType } from '@app/types';

@Component({
  selector: 'app-proceed',
  templateUrl: './proceed.component.html',
  styleUrls: ['./proceed.component.scss']
})
export class ProceedComponent implements OnInit {
  listOfParentData: any[] = [];
  listOfChildrenData: any[] = [];
  loadData: boolean = true;
  // 总共多少条数据
  tableTotal: number = 0;
  // 当前页码
  pageNumber: number = 1;
  // 默认一页显示多少条
  pageSize: number = 10;
  // 页码可以选择一次展示多少条数据
  nzPageSizeOptions: number[] = [10, 20, 30, 40, 50];
  constructor (
    private readonly orderService: OrderService,
  ) { }
  ngOnInit(): void {
    this.initOrderList({ status: 1 });
  }
  // 异步展开获取数据
  expand(isOpen: boolean, data: any): void {
    if (isOpen) {
      this.listOfChildrenData = [];
      this.loadData = true;
      this.orderService.orderDetail$(1, data.orderNo).subscribe(data => {
        const { code, message, result } = data;
        if (Object.is(code, 0)) {
          this.listOfChildrenData = result;
          this.loadData = false;
        }
      })
    }
  }

  // 获取数据
  initOrderList(params: ObjectType): void {
    this.orderService.orderList$(params).subscribe(data => {
      const { code, message, result } = data;
      if (Object.is(code, 0)) {
        this.listOfParentData = result.data;
        this.tableTotal = result.total;
        this.pageNumber = result.pageNumber;
      }
    })
  }

  // 退单处理
  rollback(data: any): void {
    const postData = {
      remark: data.remark,
      goodsType: 2,
      personNum: data.personNum,
      tableId: data.tableId,
      goodsList: [
        {
          goodsId: data.goodsId,
          title: data.title,
          shopPrice: -data.shopPrice,
          num: data.num
        }
      ]
    };
    console.log(postData);
    this.orderService.rollbackOrder$(postData).subscribe(data => {
      const { code, message, result } = data;
      if (Object.is(code, 0)) {
        this.initOrderList({ status: 1 });
      }
    })
  }

  // 页码改变触发事件
  changePageNumber(pageNumber: number): void {
    this.loadData = true;
    this.initOrderList({ pageNumber, status: 1 })
  }

  // 页数改变触发事件
  changePageSize(pageSize: number): void {
    this.loadData = true;
    this.pageSize = pageSize;
    this.initOrderList({ pageSize, status: 1 })
  }
}
