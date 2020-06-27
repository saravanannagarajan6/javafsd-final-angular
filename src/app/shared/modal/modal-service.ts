import { Injectable } from "@angular/core";
import { BsModalService } from 'ngx-bootstrap';
import { BsModalRef } from 'ngx-bootstrap';
import { ConfirmOkComponent } from './confirmok/confirmok.component';
import { SearchPopupComponent } from './search-popup/search-popup.component';
import { SearchProjectComponent } from './search-project/search-project.component';
import { SearchParenttaskComponent } from './search-parenttask/search-parenttask.component';


@Injectable({
    providedIn: 'root'    
})
export class ModalService {

    constructor(private bsModalService: BsModalService){

    }
    confirmOK(
        msg: string,
        confirmCallback: () => void,
        title?: string,
        confirmLabel?: string,
        cancelLabel?: string) {

        const clsname: string = (title === 'Information') ? 'confirmModal reassign-popup' : 'confirmModal';
        const modalRef: BsModalRef = this.bsModalService.show(ConfirmOkComponent, { class: clsname, ignoreBackdropClick: true, keyboard: false, animated: false, backdrop: 'static' });

        modalRef.content.title = title || 'Information';
        modalRef.content.confirmLabel = confirmLabel || 'OK';

        modalRef.content.msg = msg;
        modalRef.content.confirmCallback = confirmCallback;
        return modalRef;
    }
    openSearchPopUp(
        data: any,
        title?: string,
        confirmCallback?: (obj) => void,
        confirmLabel?: string,
        cancelLabel?: string) {
            const clsname: string = (title === 'Information') ? 'confirmModal reassign-popup' : 'confirmModal';
            const modalRef: BsModalRef = this.bsModalService.show(SearchPopupComponent, { class: clsname, ignoreBackdropClick: true, keyboard: false, animated: false, backdrop: 'static' });

            modalRef.content.title = title || 'Information';
            modalRef.content.confirmLabel = confirmLabel || 'OK';

            modalRef.content.msg = data;
            modalRef.content.confirmCallback = confirmCallback;
            return modalRef;
        }
        openProjectSearchPopUp(
            data: any,
            title?: string,
            confirmCallback?: (obj) => void,
            confirmLabel?: string,
            cancelLabel?: string) {
                const clsname: string = (title === 'Information') ? 'confirmModal reassign-popup' : 'confirmModal';
                const modalRef: BsModalRef = this.bsModalService.show(SearchProjectComponent, { class: clsname, ignoreBackdropClick: true, keyboard: false, animated: false, backdrop: 'static' });
    
                modalRef.content.title = title || 'Information';
                modalRef.content.confirmLabel = confirmLabel || 'OK';
    
                modalRef.content.msg = data;
                modalRef.content.confirmCallback = confirmCallback;
                return modalRef;
            }

            openParentTaskSearchPopUp(
                data: any,
                title?: string,
                confirmCallback?: (obj) => void,
                confirmLabel?: string,
                cancelLabel?: string) {
                    const clsname: string = (title === 'Information') ? 'confirmModal reassign-popup' : 'confirmModal';
                    const modalRef: BsModalRef = this.bsModalService.show(SearchParenttaskComponent, { class: clsname, ignoreBackdropClick: true, keyboard: false, animated: false, backdrop: 'static' });
        
                    modalRef.content.title = title || 'Information';
                    modalRef.content.confirmLabel = confirmLabel || 'OK';
        
                    modalRef.content.msg = data;
                    modalRef.content.confirmCallback = confirmCallback;
                    return modalRef;
                }
}