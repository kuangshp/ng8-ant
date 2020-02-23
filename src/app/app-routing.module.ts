import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './views/layout/layout.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './views/login/login.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        data: {
          title: '首页',
        },
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./views/home/home.module').then(res => res.HomeModule)
      },
      {
        path: 'file',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./views/files/files.module').then(res => res.FilesModule)
      },
      {
        path: 'goods',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./views/goods/goods.module').then(res => res.GoodsModule)
      },
      {
        path: 'system',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./views/system/system.module').then(res => res.SystemModule)
      },
      {
        path: 'setting',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./views/setting/setting.module').then(res => res.SettingModule)
      },

    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: '**',
  //   redirectTo: '',
  //   pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
