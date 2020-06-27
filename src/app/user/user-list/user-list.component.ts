import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  
  @Input() employee;
  @Output() editEvent = new EventEmitter();  
  @Output() deleteEvent = new EventEmitter();
  lang:string = "en";
  constructor(private translate: TranslateService, private router: ActivatedRoute) { }

  ngOnInit() {
    if(this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }
  }
  edit() {
    this.editEvent.emit(this.employee);
  }
  delete() {
    this.deleteEvent.emit(this.employee);
  }
}

