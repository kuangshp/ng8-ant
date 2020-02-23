import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { CategoryService } from '@app/services/goods/category/category.service';
import { ObjectType } from '@app/types';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  validateForm: FormGroup;
  status: string = '1';

  // 接收父组件传递过来的行数据
  @Input() rowData?: ObjectType = {};

  constructor (private fb: FormBuilder,
    private message: NzMessageService,
    private readonly modalService: NzModalService,
    private readonly categoryService: CategoryService
  ) {
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      status: [''],
      description: [''],
      sort: [1],
    });
  }

  ngOnInit() {
    if (Object.keys(this.rowData).length) {
      // 单独处理下拉框
      this.status = this.rowData.status + '';
      this.validateForm.patchValue(this.rowData);
    } else {
      this.validateForm.patchValue({
        title: '',
        description: '',
        sort: 1,
        status: '',
      })
    }
  }

  // 提交数据
  async handleOk(): Promise<boolean> {
    if (this.validateForm.valid) {
      const formData = this.validateForm.value;
      // 编辑数据
      if (Object.keys(this.rowData).length) {
        const { code, message, result } = await this.categoryService.modifyCategory$(this.rowData.id, formData).toPromise();
        if (Object.is(code, 0)) {
          this.message.create('success', message);
        } else {
          this.message.create('error', message);
        }
        return true
      } else {
        // 创建数据
        const { code, message, result } = await this.categoryService.createCategory$(formData).toPromise();
        if (Object.is(code, 0)) {
          this.message.create('success', message);
        } else {
          this.message.create('error', message);
        }
        return true;
      }
    } else {
      this.message.create('error', '数据校验不合格');
      return false;
    }
  }
}
