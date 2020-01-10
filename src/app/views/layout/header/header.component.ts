import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from '@app/store/store.module';
import { getCurrentCollapsed } from '@app/store/selectors';
import { toggleMenu } from '@app/store/actions';
import { Router } from '@angular/router';
import { storage } from '@app/utils'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed: boolean = false;
  constructor (private store$: Store<AppStoreModule>, private router: Router) { }

  ngOnInit() {
    this.store$.pipe(select('isCollapsed' as any), select(getCurrentCollapsed)).subscribe(item => {
      this.isCollapsed = item;
    })
  }

  toggleMenu(): void {
    this.store$.dispatch(toggleMenu())
  }

  // 修改密码
  public modifyPassword(): void {
    console.log('修改密码');
  }

  // 个人信息
  public userInfo(): void {
    console.log('个人信息');
  }

  // 退出
  public logout(): void {
    storage.clear();
    this.router.navigateByUrl('/login');
  }
}
