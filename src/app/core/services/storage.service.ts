import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    get accessToken(): string | null {
        return localStorage.getItem("accessToken");
    }

    set accessToken(accessToken: string | null) {
        if (accessToken === null)
            localStorage.setItem("accessToken", "");
        else
            localStorage.setItem("accessToken", accessToken);
    }


    get userId(): string | null {
        return localStorage.getItem('userId');
    }
    
    set userId(userId: string | null) {
        if (userId === null)
            localStorage.removeItem("userId");
        else
            localStorage.setItem("userId", userId);
    }

    clear() {
        this.accessToken = null;
        this.userId = null;
    }

    setUserId(userId: string): void {
        this.userId = userId;
    }

    setAccessToken(accessToken: string): void {
        this.accessToken = accessToken;
    }
}
