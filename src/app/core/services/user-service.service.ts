import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { GoogleAuthService } from 'ng-gapi';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GoogleUserFilter } from '../models/google-user/google-user-filter';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    route = environment.apiServer;
    savedUser!: GoogleUserFilter;

    constructor(
        private googleAuthService: GoogleAuthService,
        private ngZone: NgZone,
        private http: HttpClient,
        private storageService: StorageService,
        private router: Router
    ) {
    }

    getCurrentUserId(): string | null {

        let userId = this.storageService.userId;

        if (!userId) {
            this.signOut();
            this.router.navigate(['login']);
            throw new Error("Login is required");

        } else {
            return this.storageService.userId;
        }
    }

    getToken(): string | null {

        let token = this.storageService.accessToken;

        if (!token) {
            throw new Error("Login is required");
        }
        return this.storageService.accessToken;
    }

    signIn(routeUrl: string) {
        this.googleAuthService.getAuth().subscribe((auth) => {
            console.log('auth', auth);
            auth.signIn().then(res => {
                this.signInSuccessHandler(res);
                console.log('res', res);
                this.ngZone.run(test => {
                    console.log(test);
                    this.router.navigate([routeUrl]);
                });
            }, err => this.signInErrorHandler(err));
        });
    }

    //TODO: Rework
    signOut(): void {
        this.googleAuthService.getAuth().subscribe((auth) => {
            try {
                auth.signOut();
                this.ngZone.run(() => {
                    this.router.navigate(['login']);
                });
            } catch (e) {
                console.error(e);
            }
            this.storageService.clear();
        });
    }

    isUserSignedIn(): boolean {
        return !_.isEmpty(this.storageService.accessToken);
    }

    private signInSuccessHandler(res: any) {
        this.ngZone.run(() => {
            console.log(res.it);
            this.savedUser = new GoogleUserFilter(res.it);
            console.log(this.savedUser);
            this.storageService.setAccessToken(res.getAuthResponse().access_token);
            this.googleStoreData().subscribe(data => {
                console.log(data);
                this.googleGetUserId().subscribe()
            });
        });
    }

    googleStoreData(): Observable<GoogleUserFilter> {
        const body = this.savedUser;
        return this.http.post<GoogleUserFilter>(this.route + 'google-auth/signin', body);
    }


    googleGetUserId(): Observable<void> {
        const params = {
            email: this.savedUser.email
        }
        return this.http.get<any>(this.route + 'google-auth', { params: params }).pipe(map(data => {
            console.log(data);
            this.storageService.setUserId(data.id);
        }))
    }

    private signInErrorHandler(err: any) {
        console.warn(err);
    }
}
