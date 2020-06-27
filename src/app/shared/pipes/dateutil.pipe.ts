import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from "moment";

@Pipe({
  name: 'datedisplay'
})
export class DatedisplayPipe implements PipeTransform {

  transform(receivedDate: string, lang:string = 'en', dateFormat:string = 'DD-MMM-YYYY') {
   moment.locale(lang);
   try {
    if(receivedDate == undefined || receivedDate == ''){
      return '';
    }
    else if(receivedDate.length <= 6){
      let date = new Date();
      let dateStr = date.getFullYear().toString()+("0"+(date.getMonth()+1).toString()).slice(-2)+
          ("0"+(date.getDate().toString())).slice(-2);
          receivedDate = dateStr;
    }
     
     //let dateStr = new Date(receivedDate);
     //let datepipe = new DatePipe("en-US");
     //let displayTime = datepipe.transform(dateStr, dateFormat);
     let displayTime = moment(receivedDate).format(dateFormat);
     return displayTime;
   } catch (error) {
    let date = new Date();
      let currentDateStr = date.getFullYear().toString()+("0"+(date.getMonth()+1).toString()).slice(-2)+
          ("0"+(date.getDate().toString())).slice(-2);
      let dateStr = currentDateStr.substring(0,4)+'/'+currentDateStr.substring(4,6)+'/'+currentDateStr.substring(6,8);
     //let datepipe = new DatePipe("en-US");
     //let displayTime = datepipe.transform(dateStr, dateFormat);
     let displayTime = moment(dateStr).format(dateFormat);
     return displayTime;
   }
  }

}

