import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { ModalService } from '../../shared/modal/modal-service';
import { BsModalRef } from 'ngx-bootstrap';
import { ProjectService } from '../../services/project.service';
import { UserService } from '../../services/user.service';
import { Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Code2TextPipe } from '../../shared/pipes/code2text.pipe';
import { ViewChild } from '@angular/core';
import { DatedisplayPipe } from '../../shared/pipes/dateutil.pipe';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})

export class AddProjectComponent implements OnInit {
  dateError: boolean = false;
  constructor(private modalService: ModalService, 
    private projectService: ProjectService, 
    private userService: UserService,
    private translate: TranslateService, 
    private router: ActivatedRoute,
    private code2text: Code2TextPipe,
    private dateDisplayPipe: DatedisplayPipe) { }
  @ViewChild("f", { static: true }) projectForm;
  @Input() projectModal: any = {};
  @Output() addEvent = new EventEmitter(); 
  enableDates : boolean = false;
  employees : any = [];
  public modelRef: BsModalRef;
  loading = false;
  public enabled = true;
  lang:string = "en";
  error:any={isError:false,errorMessage:''};
  ngOnInit() {      
    if(this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }
    this.createBlankModal();
    
  }
  createBlankModal() {
    let todayDate = moment().format("YYYY-MM-DD");
    
    let tomorrowDate = moment().add(1, 'days').format("YYYY-MM-DD");   
    let blankEmployee = {
      firstName : null,
      lastName : null,
      userId : null,
      employeeId : null,
      projectId : null,
      taskId : null
    }
    this.projectModal = {
      projectId : null,
      project : null,
      startDate : todayDate,
      endDate : tomorrowDate,
      priority : 0,
      setDate : false,
      selectedEmployee : blankEmployee
    }
    
  }
  searchEmployee() {
    this.getEmployees();
   
  }
  getEmployees() {
    this.userService.getUsers().subscribe((response) =>{
      
      this.employees = response;      
      let searchEmpText = this.code2text.transform("lblSearchUser");
      this.modelRef = this.modalService.openSearchPopUp(this.employees, searchEmpText, (obj) => { this.selectedEmployee(obj); },"Select");
    }, error => {     
      
      this.redirectAfterSave("Please add the User first!!", () => { }, 
          this.code2text.transform("successTitle"));
    });
  }
  
  selectedEmployee(obj) {
    this.modelRef.hide();
    
    this.projectModal.selectedEmployee = obj.selectedItem;  
  }
  onSubmit() {
    
    this.loading = true;
    if(this.projectModal && this.projectModal.projectId) {
      this.projectService.updateProject(this.projectModal.projectId, this.projectModal).subscribe((response) =>{
        
        this.loading = false;
        this.redirectAfterSave(this.code2text.transform("msgProjectUpdate"), () => {this.reset()}, 
          this.code2text.transform("successTitle"));
        this.addEvent.emit();
      }, error => {
        
        this.loading = false;
        this.redirectAfterSave(this.code2text.transform("msgError"), () => { }, 
          this.code2text.transform("errorTitle"));
      });
    } else {
      this.projectService.saveProject(this.projectModal).subscribe((response) =>{
        
        this.loading = false;     
        this.redirectAfterSave(this.code2text.transform("msgProjectSave"), () => {this.reset()}, 
          this.code2text.transform("successTitle"));
        this.addEvent.emit();
      }, error => {
        
        this.loading = false; 
        this.redirectAfterSave(this.code2text.transform("msgError"), () => { }, 
          this.code2text.transform("errorTitle"));
      });
    }
  }
  reset() {
    //this.projectForm.reset();
   /*  this.projectModal.projectId = null;
    this.projectModal.priority = 0;
    let todayDate = moment().format("YYYY-MM-DD");
    let tomorrowDate = moment().add(1, 'days').format("YYYY-MM-DD");
    this.projectModal.startDate = todayDate;
    this.projectModal.endDate = tomorrowDate;     */
    this.projectForm.submitted = false;
    this.createBlankModal();
  }
  redirectAfterSave(popMesg, confirmCallback, popTitle) {
    this.modalService.confirmOK(popMesg, confirmCallback, popTitle);
  }
  
  changeStartDate(event, id){    
    this.projectModal.endDate = moment(event).add(1, 'days').format("YYYY-MM-DD");    
  }
}


