import { NgModule } from '@angular/core';

import { GoodsRoutingModule } from './goods-routing.module';
import { CategoryComponent } from './category/category.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from '@app/module/shared/shared.module';
import { EditCategoryComponent } from './category/modal/edit-category/edit-category.component';
import { CreateComponent } from './create/create.component';
import { OrderComponent } from './order/order.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// 加载全部的插件
import 'froala-editor/js/plugins.pkgd.min.js';
// import 'froala-editor/js/plugins/align.min.js';
// 配置语言
import 'froala-editor/js/languages/zh_cn.js';
// 第三方字体图标
// import 'froala-editor/js/third_party/font_awesome.min';
// 第三方插件
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';
import { ProceedComponent } from './order/components/proceed/proceed.component';
import { CompleteComponent } from './order/components/complete/complete.component';

@NgModule({
  declarations: [
    CategoryComponent,
    ListComponent,
    EditCategoryComponent,
    CreateComponent,
    OrderComponent,
    ProceedComponent,
    CompleteComponent,
  ],
  entryComponents: [
    EditCategoryComponent,
  ],
  imports: [
    SharedModule,
    GoodsRoutingModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot()
  ]
})
export class GoodsModule { }
