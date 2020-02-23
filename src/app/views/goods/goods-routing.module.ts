import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CategoryComponent } from './category/category.component';
import { CreateComponent } from './create/create.component';
import { OrderComponent } from './order/order.component';


const routes: Routes = [
  {
    path: '',
    component: ListComponent,
    data: {
      title: '商品列表',
    },
  },
  {
    path: 'category',
    component: CategoryComponent,
    data: {
      title: '商品分类',
    },
  },
  {
    path: 'add',
    component: CreateComponent,
    data: {
      title: '添加商品',
    },
  },
  {
    path: 'edit/:id',
    component: CreateComponent,
  },
  {
    path: 'order',
    component: OrderComponent,
    data: {
      title: '订单管理',
    },
  },
  // {
  //   path: '**',
  //   redirectTo: 'user',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoodsRoutingModule { }
