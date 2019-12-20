import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { storage } from '@utils';
import { Router } from '@angular/router';
import { authToken } from '@app/config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor (private fb: FormBuilder, private router: Router) { }
  loginValidateForm: FormGroup;


  ngOnInit() {
    this.loginValidateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  // 登录事件
  submitForm({ value }: any, ev: Event): void {
    ev.preventDefault();
    for (const i in this.loginValidateForm.controls) {
      this.loginValidateForm.controls[i].markAsDirty();
      this.loginValidateForm.controls[i].updateValueAndValidity();
    }
    console.log(value);
    storage.setItem(authToken, JSON.stringify(value));
    // 跳转到首页
    this.router.navigate(['/home']);
  }
}
