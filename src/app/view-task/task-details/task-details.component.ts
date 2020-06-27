import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  @Input() taskDetails : any = {};

  @Output() editEvent = new EventEmitter();
  @Output() endTaskEvent = new EventEmitter();
  lang:string = "en";
  constructor(private translate: TranslateService, private router: ActivatedRoute,
    public route: Router) { 
      if(this.router.snapshot.params) {
        this.lang = this.router.snapshot.params.lang;
        this.translate.setDefaultLang(this.lang);
        this.translate.use(this.lang);
      }
    }

  ngOnInit() {
    if(this.router.snapshot.params) {
      this.lang = this.router.snapshot.params.lang;
      this.translate.setDefaultLang(this.lang);
      this.translate.use(this.lang);
    }
  }
  edit() {
    this.editEvent.emit(this.taskDetails);
    this.route.navigate([this.lang + '/addTask/' + this.taskDetails.taskId]);
  }
  endTask() {
    this.endTaskEvent.emit(this.taskDetails);
  }
}
