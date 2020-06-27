import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { ProjectService } from '../services/project.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ModalService } from '../shared/modal/modal-service';
import { ParentTaskService } from '../services/parent.taskservice';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Code2TextPipe } from '../shared/pipes/code2text.pipe';
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']

})

export class AddTaskComponent implements OnInit {
  @ViewChild("taskForm", { static: false }) taskForm;
  taskModal: any = {};  
  selectedTaskModal: any = {};
  public modelRef: BsModalRef;
  parentTasks : any = [];
  projects : any = {};
  employees : any = [];
  loading = false;
  public enabled = true;
  lang:string = "en";
  selectedTaskId : string = null;
  isvalidTaskId : boolean = false;
  constructor(private projectService : ProjectService, 
              private modalService : ModalService,
              private parentTaskService : ParentTaskService, 
              private userService: UserService,
              private taskService: TaskService,
              private translate: TranslateService, 
              private router: ActivatedRoute,
              private code2text: Code2TextPipe) { }

  ngOnInit() {    
    if(this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }
    this.resetModal();
    if(this.router.snapshot.params) {
      this.selectedTaskId = this.router.snapshot.params.taskId;
      if(this.selectedTaskId) {
        this.fetchSelectedTaskById();
      }
      
    }
    
    
  }
  fetchSelectedTaskById() {
    this.loading = true;
      this.taskService.getTaskByTaskId(this.selectedTaskId).subscribe((response) =>{
        
        this.selectedTaskModal = response;
        this.fetchSelectedProject(this.selectedTaskModal.projectId);
        this.isvalidTaskId = true;
        this.loading = false;
      }, error => {
        
        this.isvalidTaskId = false;    
        this.loading = false;
      });
  }
  fetchSelectedProject(projectId) {
    this.projectService.getProjectById(projectId).subscribe((response) =>{
      
      this.selectedTaskModal.selectedProject = response;
      if(this.selectedTaskModal && (this.selectedTaskModal.selectedParentTask == null)) {
        let blankParentTask = {
          parentId : null,
          parentTask : null
        };
        this.selectedTaskModal.selectedParentTask = blankParentTask;
      }
      this.taskModal = this.selectedTaskModal;
      this.loading = false;
    }, error => {
      
      this.loading = false;
    });
  }
  resetModal() {
    this.isvalidTaskId = true;
    let todayDate = moment().format("YYYY-MM-DD");
    let tomorrowDate = moment().add(1, 'days').format("YYYY-MM-DD");
    let blankProject = {
      projectId : null,
      project : null
    }
    let blankEmployee = {
      firstName : null,
      lastName : null,
      userId : null,
      employeeId : null,
      projectId : null,
      taskId : null
    };
    let blankParentTask = {
      parentId : null,
      parentTask : null
    };
    this.taskModal = {
      taskId : null,
      task : null,      
      parentId : null,
      selectedProject : blankProject,
      startDate : todayDate,
      endDate : tomorrowDate,
      priority : 0,
      status : 1,
      setParent : false,
      selectedParentTask : blankParentTask,
      selectedEmployee : blankEmployee
    };

    
  }
  searchParentTask() {
    this.getParentTasks();
  }  
  getParentTasks() {

    this.loading = true;    
    this.parentTaskService.getParentTasks().subscribe((response) =>{
      
      this.loading = false;    
      this.parentTasks = response;      
      this.modelRef = this.modalService.openParentTaskSearchPopUp(
                                        this.parentTasks, 
                                        "Search Parent Task", 
                                        (obj) => { this.selectedParentTask(obj); },"Select");

    }, error => {    
      this.loading = false;     
      
      this.redirectAfterSave("Please add Parent Task first!!", () => { }, 
          this.code2text.transform("successTitle"));
    });
  }

  selectedParentTask(obj) {
    this.modelRef.hide();
    
    this.taskModal.selectedParentTask = obj.selectedItem;  
    this.taskModal.parentId = obj.selectedItem.parentId;
  }
  searchEmployee() {
    this.getEmployees();   
  }
  getEmployees() {
    this.loading = true;    
    this.userService.getUsers().subscribe((response) =>{
      
      this.loading = false;     
      this.employees = response;      
      this.modelRef = this.modalService.openSearchPopUp(this.employees, "Search Employee", (obj) => { this.selectedEmployee(obj); },"Select");
    }, error => {     
      this.loading = false;    
      
      this.redirectAfterSave("Please add the User first!!", () => { }, 
          this.code2text.transform("successTitle"));
    });
  }
  
  selectedEmployee(obj) {
    this.modelRef.hide();
    
    this.taskModal.selectedEmployee = obj.selectedItem;  
  }
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
                                        (obj) => { this.selectedProject(obj); },"Select");

    }, error => {     
      this.loading = false;    
      
      this.redirectAfterSave("Please add the Project first!!", () => { }, 
          this.code2text.transform("successTitle"));
    });
  }
  selectedProject(obj) {
    this.modelRef.hide();
    
    this.taskModal.selectedProject = obj.selectedItem;  
  }
  onSubmit() {
    
    if(this.taskModal) {
      if(this.taskModal.setParent) {
        this.saveParentTask();
      } else {
        this.saveTask();
      }
    }
  }
  saveParentTask() {
    this.loading = true;    
    let parentTask = {parentTask: this.taskModal.task};
      this.parentTaskService.saveParentTask(parentTask).subscribe((response) =>{
        this.loading = false;     
        //this.reset();
        this.redirectAfterSave("Parent Task Saved successfully", () => {this.reset()}, "Success");
        
      }, error => {  
        this.loading = false; 
        this.redirectAfterSave("Error occured..", () => {}, "Error");
      });
  }
  saveTask() {   
    this.loading = true;    
    if(this.taskModal && this.taskModal.taskId != null) {
      this.taskService.updateTask(this.taskModal.taskId, this.taskModal).subscribe((response) =>{
        this.loading = false;     
        //this.reset();
        this.redirectAfterSave("Task Updated successfully", () => {this.reset()}, "Success");
        
      }, error => {  
        this.loading = false; 
        this.redirectAfterSave("Error occured..", () => {}, "Error");
      });
    } else {
      this.taskService.saveTask(this.taskModal).subscribe((response) =>{
        this.loading = false;     
        //this.reset();
        this.redirectAfterSave("Task Saved successfully", () => {this.reset()}, "Success");
        
      }, error => {  
        this.loading = false; 
        this.redirectAfterSave("Error occured..", () => {}, "Error");
      });
    }
    
  }
  redirectAfterSave(popMesg, confirmCallback, popTitle) {
    this.modalService.confirmOK(popMesg, confirmCallback, popTitle);
  }
  clearParentTask() {
    let blankParentTask = {
      parentId : null,
      parentTask : null
    }
    this.taskModal.selectedParentTask = blankParentTask;
  }

  changeStartDate(event, id){    
    this.taskModal.endDate = moment(event).add(1, 'days').format("YYYY-MM-DD");    
  }
  reset() {
    /* if(this.taskForm) {
      this.taskForm.reset();
    } */    
    this.taskForm.submitted = false;
    this.resetModal();
  }
}

