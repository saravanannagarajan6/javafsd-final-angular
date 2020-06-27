import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './addUser/addUser.component';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../services/user.service';
import { ModalModule } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { NgxLoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    UserComponent,
    AddUserComponent,
    UserListComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    SharedModule,
    UserRoutingModule,
    NgxLoadingModule.forRoot({}),
    TranslateModule
  ],
  providers: [UserService]
})
export class UserModule { }
