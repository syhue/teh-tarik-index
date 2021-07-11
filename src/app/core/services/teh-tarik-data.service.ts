import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Coordinates } from '../models/coordinates/coordinates';
import { UserService } from './user-service.service';

class InputForm {
    price!: number | null;
    location!: Coordinates;
    ipAddress!: string;
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

    createTehTarik(body: InputForm): Observable<InputForm> {

        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.userService.getToken()}`
        })

        const options = { headers: headers };
        return this.http.post<InputForm>(this.route, body, options);
    }
}
