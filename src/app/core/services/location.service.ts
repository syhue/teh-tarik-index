import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TehTarikDetails } from 'src/app/core/services/teh-tarik-data.service';
import { environment } from '../../../environments/environment';
import { Coordinates } from '../models/coordinates/coordinates';

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    route = environment.apiServer + 'teh-tarik';

    constructor(
        private http: HttpClient
    ) { }

    getTehTarikDetails():Observable<TehTarikDetails[]> {
        return this.http.get<TehTarikDetails[]>(this.route)
    }
}
