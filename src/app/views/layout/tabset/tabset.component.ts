import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tabset',
  templateUrl: './tabset.component.html',
  styleUrls: ['./tabset.component.scss']
})
export class TabsetComponent implements OnInit {
  public selectedIndex: number = 0;
  public activeTabs = [];
  constructor () { }

  ngOnInit() {
    if (this.activeTabs.length === 0) {
      this.activeTabs.push({
        id: '0',
        index: 0,
        enabled: true,
        name: '首页',
        close: false,
        icon: 'home',
        refresh: 'N',
        content: {
          ID: '0',
          MENUID: 'HOME',
          ROUTER: 'home',
          MENUTYPE: 'INURL'
        }
      })
    }
  }

  // 选择菜单切换路由
  public selectedTabMenu(tab: string): void {
    console.log(tab);
  }

  // 关闭菜单
  public closeTabNav(tab: string): void {
    console.log(tab)
  }
}
