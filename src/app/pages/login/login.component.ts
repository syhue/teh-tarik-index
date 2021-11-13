import { Component, OnInit } from '@angular/core';
import { GoogleApiService } from 'ng-gapi';
import { UserService } from '../../core/services/user-service.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(
        private userService: UserService,
        private gapiService: GoogleApiService,
    ) { }

    ngOnInit() {
        this.gapiService.onLoad().subscribe(res => console.log(res));
    }

    isLoggedIn(): boolean {
        return this.userService.isUserSignedIn();
    }

    signIn() {
        const routeUrl = 'home'
        this.userService.signIn(routeUrl);
    }
}
