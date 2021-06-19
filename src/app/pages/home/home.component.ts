import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild('form', { static: false, read: NgForm }) form: NgForm | undefined;
    showFormError = false;
    priceTehTarik = null;

    constructor() { }

    ngOnInit(): void {
    }

    submit() {
        
    }

}
