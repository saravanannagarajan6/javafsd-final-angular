import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ModalService } from '../shared/modal/modal-service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Code2TextPipe } from '../shared/pipes/code2text.pipe';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  
  loading = false;
  projectList: any = [];
  lang:string = "en";
  isDesc = false;
  selectedProject : any = {};
  constructor(private modalService: ModalService, private projectService: ProjectService,
    private translate: TranslateService, private router: ActivatedRoute,
    private code2text: Code2TextPipe) { }

  ngOnInit() {   
    if(this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }
    this.getProjects('');   
  }
  getProjects(evt) {
    this.loading = true;
    this.projectService.getProjects().subscribe((response) => {
      
      this.projectList = response;
      this.calculateNoOfTaskandCompletedTask();
      this.loading = false;
    }, error => {
      this.loading = false;
      
    });
    
  }
  calculateNoOfTaskandCompletedTask() {
    if(this.projectList && this.projectList.length > 0) {
      this.projectList.forEach(project => {
        if(project && project.tasks) {
          project.noOfTasks = project.tasks.length;
          project.completedTasks = project.tasks.filter(task => task.status == 0).length;
        }
      });        
    }
  }
  sort(property) {
    this.isDesc = !this.isDesc;
    let direction = this.isDesc ? 1 : -1;
    this.projectList.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      }
      else if (a[property] > b[property]) {
        return 1 * direction;
      }
      else {
        return 0;
      }
    });
    
  };

  
  deleteProject(projectDetailObj) {
    this.loading = true;
    this.projectService.deleteProject(projectDetailObj.projectId).subscribe((response) => {
      this.loading = false;
      
      this.redirectAfterSave(this.code2text.transform("msgProjectDelete"), () => { }, 
        this.code2text.transform("successTitle"));
      this.getProjects('');
    }, error => {      
      this.loading = false;
      this.redirectAfterSave("Error occured", () => { }, "Error");
      this.redirectAfterSave(this.code2text.transform("msgError"), () => { }, 
        this.code2text.transform("errorTitle"));
      
    });
  }
  redirectAfterSave(popMesg, confirmCallback, popTitle) {
    this.modalService.confirmOK(popMesg, confirmCallback, popTitle);
  }
  
  editProject(projectDetailObj) {
    this.selectedProject = Object.assign({}, projectDetailObj);
  
  }

}
