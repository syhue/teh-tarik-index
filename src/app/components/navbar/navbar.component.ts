import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    menus = [
        {
            name: "About Us",
            route: "about-us"
        },
        {
            name: "Home",
            route: "home"
        },
        {
            name: "Map",
            route: "map"
        },
    ]

    constructor() { }

    ngOnInit(): void {
    }

}
