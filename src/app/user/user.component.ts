import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ModalService } from '../shared/modal/modal-service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  selectedEmployee : any = {};
  lang:string = "en";
  employees : any = [];
  loading = false;
  isDesc = false;
  constructor(private modalService: ModalService, private userService: UserService,
    private translate: TranslateService, private router: ActivatedRoute) { }
  ngOnInit() {
    if(this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }
    
    this.getEmployees('');
  }
  getEmployees(evt) {
    this.loading = true;
    this.userService.getUsers().subscribe((response) =>{
      
      this.employees = response || [];
      this.loading = false;
    }, error => {
      this.loading = false;
      
    });
  }
  sort(property){
    this.isDesc = !this.isDesc;  
    let direction = this.isDesc ? 1 : -1;
    this.employees.sort(function(a, b){
        if(a[property] < b[property]){
            return -1 * direction;
        }
        else if( a[property] > b[property]){
            return 1 * direction;
        }
        else{
            return 0;
        }
    });
    
};

editEmployee(employeeObj) {
    this.selectedEmployee = Object.assign({}, employeeObj);
}
deleteEmployee(employeeObj) {
    this.userService.deleteUser(employeeObj.userId).subscribe((response) =>{
        
        this.redirectAfterSave("User deleted successfully", () => {}, "Success");    
        this.getEmployees('');
      }, error => {
        
        
      });
}
redirectAfterSave(popMesg, confirmCallback, popTitle) {
    this.modalService.confirmOK(popMesg, confirmCallback, popTitle);

}
}

