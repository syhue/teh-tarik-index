import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import * as _ from "lodash";
import { GoogleAuthService } from 'ng-gapi';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GoogleUserFilter } from '../models/google-user/google-user-filter';
import { StorageService } from './storage.service';

@Injectable()
export class UserService {

    route = environment.apiServer;
    savedUser!: GoogleUserFilter;

    constructor(
        private googleAuthService: GoogleAuthService,
        private ngZone: NgZone,
        private http: HttpClient,
        private storageService: StorageService
    ) {
    }

    getCurrentUserId(): string | null {
        
        let userId = this.storageService.userId;

        if (!userId) {
            this.signOut();
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

    signIn() {

        this.googleAuthService.getAuth().subscribe((auth) => {
            auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
        });
    }

    //TODO: Rework
    signOut(): void {
        this.googleAuthService.getAuth().subscribe((auth) => {
            try {
                auth.signOut();
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
            this.savedUser = new GoogleUserFilter(res.Ys);
            
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
            this.storageService.setUserId(data.id);
        }))
    }

    private signInErrorHandler(err: any) {
        console.warn(err);
    }
}