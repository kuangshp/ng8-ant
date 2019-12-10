import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users.component';


@NgModule({
  declarations: [LoginComponent, UsersComponent],
  imports: [
    CommonModule,
    UsersRoutingModule
  ],
})
export class UsersModule { }
