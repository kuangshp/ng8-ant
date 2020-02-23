import { FormControl } from '@angular/forms';
// 校验手机号码
export const ValidatorsMobile = (control: FormControl): object => {
  if (control.value) {
    const mobileReg = /^1(3|4|5|6|7|8|9)\d{9}$/;
    let valid = mobileReg.test(control.value);
    return valid ? null : { mobile: true };
  } else {
    return null;
  }
}
