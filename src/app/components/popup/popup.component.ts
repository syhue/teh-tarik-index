import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss']
})
export class PopupComponent {

    gotCancel!: boolean;
    message!: string;

    constructor(public activeModal: NgbActiveModal) { }

    ok(): void {
        this.activeModal.close();
    }

    cancel(): void {
        this.activeModal.dismiss();
    }
}
