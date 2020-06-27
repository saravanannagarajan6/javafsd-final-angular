import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {  
  @Input() projectDetail: any = {};
  @Output() editEvent = new EventEmitter();

  @Output() deleteEvent = new EventEmitter();
  lang:string = "en";
  noOfTasks : number = 0;
  completedTasks : number = 0;
  constructor(private translate: TranslateService, private router: ActivatedRoute) { }

  ngOnInit() {
    if(this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }    
  }  
  edit() {
    this.editEvent.emit(this.projectDetail);
  }
  delete() {
    this.deleteEvent.emit(this.projectDetail);
  }
}

