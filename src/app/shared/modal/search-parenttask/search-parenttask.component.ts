import { Component, OnInit } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-search-parenttask',
  templateUrl: './search-parenttask.component.html',
  styleUrls: ['./search-parenttask.component.css']
})
export class SearchParenttaskComponent {
  title: string = 'Information';
  msg: string = '';
  confirmLabel: string = 'OK';
  selectedItem: any;
  confirmCallback: Function;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(public bsModalRef: BsModalRef) { }

  confirmClick() {
    if (this.confirmCallback) {
        this.confirmCallback(this);
    }
  }
 
  listClick(event, newValue) {
    
    this.selectedItem = newValue; 
  }
}
