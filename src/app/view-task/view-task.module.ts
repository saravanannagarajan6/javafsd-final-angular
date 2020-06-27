import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewTaskComponent } from './view-task.component';
import { ViewTaskRoutingModule } from './view-task-routing.module';
import { NgxLoadingModule } from 'ngx-loading';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskService } from '../services/task.service';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { ModalModule } from 'ngx-bootstrap';
import { ProjectService } from '../services/project.service';

@NgModule({

  declarations: [ViewTaskComponent, TaskDetailsComponent],
  imports: [
    CommonModule,    
    SharedModule,
    ModalModule.forRoot(),    
    ViewTaskRoutingModule,
    NgxLoadingModule.forRoot({}),
    TranslateModule
  ],
  providers: [TaskService, ProjectService]
})

export class ViewTaskModule { }

