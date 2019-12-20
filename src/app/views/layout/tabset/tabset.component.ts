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
