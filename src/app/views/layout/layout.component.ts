import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from '@app/store/store.module';
import { toggleMenu } from '@store/actions';
import { getCurrentCollapsed } from '@store/selectors';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
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
