import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from '@app/store/store.module';
import { getCurrentCollapsed } from '@app/store/selectors';
import { toggleMenu } from '@app/store/actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public isCollapsed: boolean = false;
  constructor (private store$: Store<AppStoreModule>) { }

  ngOnInit() {
    this.store$.pipe(select('isCollapsed' as any), select(getCurrentCollapsed)).subscribe(item => {
      this.isCollapsed = item;
    })
  }

  toggleMenu(): void {
    this.store$.dispatch(toggleMenu())
  }
}
