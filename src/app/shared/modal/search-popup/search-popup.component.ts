import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: '',
  templateUrl: './search-popup.component.html',
  styleUrls: ['./search-popup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SearchPopupComponent {

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
    this.selectedItem = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
  }
}
