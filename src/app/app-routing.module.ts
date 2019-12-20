import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/shared/login/login.component';
import { LayoutComponent } from './views/layout/layout.component';
import { AuthGuard } from './auth/auth.guard';


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
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./views/home/home.module').then(res => res.HomeModule)
      },
      {
        path: 'setting',
        canActivateChild: [AuthGuard],
        loadChildren: () => import('./views/system/system.module').then(res => res.SystemModule)
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
