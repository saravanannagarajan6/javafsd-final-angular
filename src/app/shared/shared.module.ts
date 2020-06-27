import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/searchpipe.pipe';
import { ModalService } from './modal/modal-service';
import { ConfirmOkComponent } from './modal/confirmok/confirmok.component';
import { SearchPopupComponent } from './modal/search-popup/search-popup.component';
import { PopupItemComponent } from './modal/search-popup/popup-item/popup-item.component';
import { SearchProjectComponent } from './modal/search-project/search-project.component';
import { SearchParenttaskComponent } from './modal/search-parenttask/search-parenttask.component';
import { DatedisplayPipe } from './pipes/dateutil.pipe';
import { Code2TextPipe } from './pipes/code2text.pipe';
import { StringToDatedisplayPipe } from './pipes/stringtodate.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [ConfirmOkComponent, 
                    SearchPopupComponent, 
                    SearchParenttaskComponent,
                    SearchProjectComponent],
  declarations: [SearchPipe, 
                DatedisplayPipe,
                Code2TextPipe,
                StringToDatedisplayPipe,
                ConfirmOkComponent, 
                SearchPopupComponent, 
                SearchPopupComponent, 
                PopupItemComponent, 
                SearchProjectComponent, 
                SearchParenttaskComponent],
  
  exports: [SearchPipe, DatedisplayPipe, Code2TextPipe, StringToDatedisplayPipe, ConfirmOkComponent, SearchPopupComponent],   
  providers: [ModalService, Code2TextPipe, StringToDatedisplayPipe]
})
export class SharedModule { }
