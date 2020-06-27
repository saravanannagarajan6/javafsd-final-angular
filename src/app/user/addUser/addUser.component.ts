import { Component, OnInit, EventEmitter } from '@angular/core';
import { ModalService } from '../../shared/modal/modal-service';
import { UserService } from '../../services/user.service';
import { Input } from '@angular/core';
import { Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-addUser',
  templateUrl: './addUser.component.html',
  styleUrls: ['./addUser.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild("f", { static: true }) userForm;
  lang:string = "en";
  @Input() employee : any = {};  
  @Output() addEvent = new EventEmitter(); 
  loading = false;
  constructor(private modalService: ModalService, private userService: UserService,
    private translate: TranslateService, private router: ActivatedRoute) { }

  ngOnInit() {
    if(this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }
  }
  
  onSubmit() {
    this.loading = true;
    if(this.employee && this.employee.userId) {
      this.userService.updateUser(this.employee.userId, this.employee).subscribe((response) =>{
               
        this.loading = false;
        this.redirectAfterSave("User updated successfully", () => {this.reset()}, "Success");
        this.addEvent.emit();
      }, error => {
            
        this.loading = false;
        this.redirectAfterSave("Error occured..", () => {}, "Error");
      });
    } else {
      this.userService.saveUser(this.employee).subscribe((response) =>{
        
        this.loading = false;     
        this.redirectAfterSave("User Saved successfully", () => {this.reset()}, "Success");
        this.addEvent.emit();
      }, error => {
         
        this.loading = false; 
        this.redirectAfterSave(error.error.message, () => {}, "Error");
      });
    }
  }
  reset() {
    this.userForm.submitted = false;
    this.employee = {
      userId: null,
      employeeId: null,
      firstName: null,
      lastName: null
    }
    this.employee.userId = null;
  }
  redirectAfterSave(popMesg, confirmCallback, popTitle) {
    this.modalService.confirmOK(popMesg, confirmCallback, popTitle);
  }
}

