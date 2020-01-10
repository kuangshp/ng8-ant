import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppStoreModule } from '@app/store/store.module';
import { toggleMenu } from '@app/store/actions';
import { getCurrentCollapsed } from '@app/store/selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  public isCollapsed: boolean = false;
  constructor (private store$: Store<AppStoreModule>, private router: Router) { }

  ngOnInit() {
    this.store$.pipe(select('isCollapsed' as any), select(getCurrentCollapsed)).subscribe(item => {
      this.isCollapsed = item;
    })
  }

  select(a) {
    console.log(a);
    this.router.navigateByUrl(a);
  }
}
