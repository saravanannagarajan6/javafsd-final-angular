import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectComponent } from './project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectRoutingModule } from './project-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap';
import { ProjectService } from '../services/project.service';
import { NgxLoadingModule } from 'ngx-loading';
import { TranslateModule } from '@ngx-translate/core';
import { DatedisplayPipe } from '../shared/pipes/dateutil.pipe';

@NgModule({
  declarations: [ProjectComponent, AddProjectComponent, ProjectDetailComponent],
  imports: [   
    CommonModule,
    ModalModule.forRoot(),
    SharedModule,
    HttpClientModule,
    ProjectRoutingModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    NgxBootstrapSliderModule,
    NgxLoadingModule.forRoot({}),
    TranslateModule
  ],
  providers: [UserService, ProjectService, DatedisplayPipe]
})
export class ProjectModule { }


