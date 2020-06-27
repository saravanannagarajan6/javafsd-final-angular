import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskComponent } from './add-task.component';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AddTaskRoutingModule } from './add-task-routing.module';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { NgxLoadingModule } from 'ngx-loading';
import { ProjectService } from '../services/project.service';
import { ParentTaskService } from '../services/parent.taskservice';

import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { SliderModule } from 'ngx-rslide';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [AddTaskComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    SharedModule,
    HttpClientModule,
    AddTaskRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    NgxBootstrapSliderModule,
    NgxLoadingModule.forRoot({}),
    TranslateModule
  ],
  providers: [ProjectService, ParentTaskService, UserService, TaskService]
})
export class AddTaskModule { }
