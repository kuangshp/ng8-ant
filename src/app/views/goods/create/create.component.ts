import { Component, OnInit, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzMessageService, NzModalService, UploadFile, UploadChangeParam } from 'ng-zorro-antd';
import { CategoryService } from '@app/services/goods/category/category.service';
import { environment } from 'src/environments/environment';
import { storage } from '@app/utils';
import { authToken } from '@app/config';
import { GoodsService } from '@app/services/goods/goods/goods.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CreateComponent),
      multi: true
    }
  ]
})
export class CreateComponent implements OnInit {
  // 编辑器时候传递过来的id
  subId: string;
  validateForm: FormGroup;
  categoryList: any[] = [];
  categoryId: string;
  isBest: string = '0';
  isHot: string = '0';
  isNew: string = '0';
  status: string = '1';

  // 上传图片
  uploadImageAction: string = '';
  showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  fileList = [];
  previewImage: string | undefined = '';
  previewVisible = false;

  // 编辑器的文字
  editorContent: string = ''
  // 文本编辑器
  froalaEditorOptions: Object = {
    placeholderText: '请输入商品详细信息',
    charCounterCount: false,
    height: 300, // 固定高度
    language: 'zh_cn', // 配置使用的语言
    fileUpload: false, // 让上传文件按钮无效
    // fileInsertButtons: ['fileBack', '|', 'insertTable'],
    fileUploadURL: 'aaa',
    linkAutoPrefix: 'http://localhost:3000',
    imageUploadURL: `${environment.baseUrl}admin/goods/upload_image`, // 配置上传图片路径 参考https://www.froala.com/wysiwyg-editor/docs/options#imageAllowedTypes
    // imageAllowedTypes: ['png', 'jpg', 'gif', 'jpeg'], // 支持上传图片的格式
    imageDefaultAlign: 'left', // 默认上传的位置
    imageDefaultDisplay: 'inline', //默认上传元素属性
    imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'], // 配置上传图片的按钮组
    imageManagerLoadURL: environment.baseUrl, // 图片关联的地址
    // events: {
    //   'image.uploaded': (response) => {
    //     console.log(response);
    //     console.log(this);
    //   },
    //   'image.inserted': (img, response) => {
    //     console.log(img, response, '----');
    //   },
    //   'image.replaced': (img, response) => {
    //     console.log(img, response);
    //   }
    // },
    requestHeaders: {
      token: JSON.parse(storage.getItem(authToken)),
    }
  }

  constructor (
    private fb: FormBuilder,
    private readonly router: Router,
    private message: NzMessageService,
    private readonly route: ActivatedRoute,
    private readonly modalService: NzModalService,
    private readonly categoryService: CategoryService,
    private readonly goodsService: GoodsService,
  ) {
    // 拼接上传图片的地址
    this.uploadImageAction = `${environment.baseUrl}admin/goods/upload_image`;
    this.validateForm = this.fb.group({
      title: ['', [Validators.required]],
      categoryId: [''],
      subTitle: [''],
      goodsImg: [''],
      shopPrice: [''],
      marketPrice: [''],
      count: ['100000'],
      mostNum: ['100'],
      isBest: [''],
      isHot: [''],
      isNew: [''],
      sort: ['1'],
      status: [''],
      content: [''],
    });
  }

  ngOnInit() {
    this.initCategoryList();
    // 如果是编辑的时候就去请求数据
    this.route.params.subscribe((params: any) => {
      this.subId = params.id;
      if (params.id) {
        this.initGoodsDetails(params.id);
      }
    });
  }
  // 上传成功的时候将图片地址追加到表单中
  change(event: UploadChangeParam) {
    const { type, file } = event;
    if (type == 'success') {
      this.validateForm.patchValue({
        goodsImg: file.response.link
      })
    }
  }

  // 获取全部的分类
  initCategoryList(): void {
    this.categoryService.categoryList$({ pageSize: 1000 }).subscribe(data => {
      const { code, message, result } = data;
      if (Object.is(code, 0)) {
        this.categoryList = result.data;
      }
    })
  }
  // 查看原图
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  };

  // 创建商品
  submitForm = (forms: any, ev: Event) => {
    ev.preventDefault();
    if (forms.valid) {
      console.log(forms.value);
      console.log(this.editorContent);
      const postData = Object.assign(this.validateForm.value, { content: this.editorContent });
      // 判断是修改还是新增数据
      if (this.subId) {
        this.goodsService.modifyGoods$(this.subId, postData).subscribe(data => {
          const { code, message, result } = data;
          if (Object.is(code, 0)) {
            this.message.create('success', message);
            this.router.navigateByUrl('/goods');
          } else {
            this.message.create('error', message);
          }
        })
      } else {
        this.goodsService.createGoods$(postData).subscribe(data => {
          const { code, message, result } = data;
          if (Object.is(code, 0)) {
            this.message.create('success', message);
            this.router.navigateByUrl('/goods');
          } else {
            this.message.create('error', message);
          }
        })
      }
    } else {
      this.message.create('error', '请检查必填字段');
    }
  }
  /****************以下为编辑商品的操作*************** */
  // 根据id去获取该商品
  initGoodsDetails(id: string): void {
    this.goodsService.goodsDeatils$(id).subscribe(data => {
      console.log(data);
      const { code, message, result } = data;
      if (Object.is(code, 0)) {
        this.validateForm.patchValue(result);
        this.categoryId = result.categoryId + '';
        this.isBest = result.isBest + '';
        this.isHot = result.isHot + '';
        this.isNew = result.isNew + '';
        this.status = result.status + '';
        this.editorContent = result.content;
        this.fileList = [
          {
            uid: result.uuid,
            name: result.title,
            status: 'done',
            url: result.goodsImg
          }
        ]
      } else {
        this.message.create('error', message);
      }
    })
  }
}
