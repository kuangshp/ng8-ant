import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss']
})
export class TabsetComponent implements OnInit {
  public selectedIndex: number = 0;
  public activeTabs = [];
  constructor (private router: Router) { }

  ngOnInit() {
    if (this.activeTabs.length === 0) {
      this.activeTabs.push({
        id: '0',
        index: 0,
        enabled: true,
        name: '首页',
        close: false,
        icon: 'home',
        router: 'home',
      })
    }
  }

  // 选择菜单切换路由
  public selectedTabMenu(tab: any): void {
    console.log(tab, "???");
    const { router } = tab;
    this.router.navigateByUrl(router);
  }

  // 关闭菜单
  public closeTabNav(tab: string): void {
    console.log(tab)
  }
}
