import { Component, OnInit } from '@angular/core';
import { Description1, Description2 } from '../../../assets/contant';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

    Description1 = Description1;
    Description2 = Description2;

    constructor() { }

    ngOnInit(): void {
    }

}
