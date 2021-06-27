import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class IpService {

    constructor(
        private http: HttpClient
    ) { }

    getIPAddress(): Observable<string> {
        return this.http.get<{ ip: string }>('http://api.ipify.org/?format=json').pipe(map(d => d.ip));
    }
}
