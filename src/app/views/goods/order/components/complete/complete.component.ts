import { Component, OnInit } from '@angular/core';
import { ObjectType } from '@app/types';
import { OrderService } from '@app/services/goods/order/order.service';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.scss']
})
export class CompleteComponent implements OnInit {
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
    this.initOrderList({ status: 0 });
  }
  // 异步展开获取数据
  expand(isOpen: boolean, data: any): void {
    if (isOpen) {
      this.listOfChildrenData = [];
      this.loadData = true;
      this.orderService.orderDetail$(0, data.orderNo).subscribe(data => {
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

  // 页码改变触发事件
  changePageNumber(pageNumber: number): void {
    this.loadData = true;
    this.initOrderList({ pageNumber, status: 0 })
  }

  // 页数改变触发事件
  changePageSize(pageSize: number): void {
    this.loadData = true;
    this.pageSize = pageSize;
    this.initOrderList({ pageSize, status: 0 })
  }
}
