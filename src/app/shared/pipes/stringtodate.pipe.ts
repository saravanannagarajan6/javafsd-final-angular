import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from "moment";

@Pipe({
  name: 'stringTodate'
})
export class StringToDatedisplayPipe implements PipeTransform {

  transform(receivedDateStr: string) {
    let receivedDate = new Date(receivedDateStr);    
    let nextDate = moment(receivedDate).add(1, 'days').toDate();
    
    return nextDate;
  }
   
}

