import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user-service.service';

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

    constructor(
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit(): void {
    }

    logout() {
        this.userService.signOut();
        this.router.navigate(['login']);
    }

}
