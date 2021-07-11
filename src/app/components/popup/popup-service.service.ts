import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupComponent } from './popup.component';

@Injectable({
    providedIn: 'root'
})
export class PopupServiceService {

    defaultOptions: any = {
        size: 'sm',
        backdrop: 'static',
        centered: true,
        keyboard: false,
        windowClass: 'modal-popup',
        backdropClass: 'backdrop-popup',
    }

    constructor(
        private modalService: NgbModal
    ) { }

    alert(message: string): Promise<any> {
        return this.open(message);
    }

    confirm(message: string): Promise<any> {
        return this.open(message);
    }

    private open(message: string): Promise<any> {
        const modalRef = this.modalService.open(PopupComponent, this.defaultOptions);
        modalRef.componentInstance.message = message;
        return modalRef.result;
    }
}
