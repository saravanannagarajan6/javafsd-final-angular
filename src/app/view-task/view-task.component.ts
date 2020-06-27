import { Component, OnInit } from '@angular/core';
import { ModalService } from '../shared/modal/modal-service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';
import { BsModalRef } from 'ngx-bootstrap';
import { Code2TextPipe } from '../shared/pipes/code2text.pipe';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']

})
export class ViewTaskComponent implements OnInit {
  loading = false;
  tasks: any = [];
  lang:string = "en";
  isDesc = false;
  selectedProject : any = null;
  projects : any = [];
  public modelRef: BsModalRef;
  constructor(private projectService : ProjectService, 
    private modalService: ModalService, private taskService: TaskService,
    private translate: TranslateService, private router: ActivatedRoute,
    private code2text: Code2TextPipe) { }

  ngOnInit() {   
    if(this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }
    this.getTasks('');   
  }
  getTasks(evt) {
    this.loading = true;
    this.taskService.getTasks().subscribe((response) => {
      this.tasks = response;
      //this.tasks = this.tasks.filter(task => task.status != "0");
      this.loading = false;
    }, error => {
      this.loading = false;
      
    });
  }
  sort(property) {
    this.isDesc = !this.isDesc;
    let direction = this.isDesc ? 1 : -1;
    this.tasks.sort(function (a, b) {
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

  
  endTask(taskDetails) {
    this.loading = true;
    this.taskService.updateTaskStatus(taskDetails.taskId).subscribe((response) => {
      this.loading = false;
      
      this.redirectAfterSave("Task ended successfully", () => { }, "Success");
      this.getTasks('');
    }, error => {
      
      this.loading = false;
      
    });
  }
  redirectAfterSave(popMesg, confirmCallback, popTitle) {
    this.modalService.confirmOK(popMesg, confirmCallback, popTitle);
  }
  
  /* editTask(projectDetailObj) {
    this.selectedProject = Object.assign({}, projectDetailObj);  
  } */
  searchProject() {    
    this.getProjects();
  }  
  getProjects() {
    this.loading = true;    
    this.projectService.getProjects().subscribe((response) =>{
      
      this.loading = false;         
      this.projects = response;      
      this.modelRef = this.modalService.openProjectSearchPopUp(
                                        this.projects, 
                                        "Search Project", 
                                        (obj) => { this.getSelectedProject(obj); },"Select");

    }, error => {     
      this.loading = false;    
      
      this.redirectAfterSave("Please add the Project first!!", () => { }, 
          this.code2text.transform("successTitle"));
    });
  }
  getSelectedProject(obj) {
    this.modelRef.hide();
    
    this.selectedProject = obj.selectedItem;  
    this.tasks = obj.selectedItem.tasks;
    //this.tasks = this.tasks.filter(task => task.status != "0");
  }
}



