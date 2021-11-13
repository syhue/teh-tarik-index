import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UserService } from './user-service.service';

export class TehTarikDetails {
    price!: string | undefined;
    coordinateX!: string;
    coordinateY!: string;
    // ipAddress!: string;
    locationName!: string;
    userId!: string | null;
}

@Injectable({
    providedIn: 'root'
})
export class TehTarikDataService {

    route = environment.apiServer + 'teh-tarik';

    constructor(
        private http: HttpClient,
        private userService: UserService
    ) { }

    createTehTarik(body: TehTarikDetails): Observable<TehTarikDetails> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.userService.getToken()}`
        })

        const options = { headers: headers };
        return this.http.post<TehTarikDetails>(this.route, body, options);
    }
}
