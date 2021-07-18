import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

    getLocation():Observable<Coordinates[]> {
        return this.http.get<{locationX: number, locationY: number}[]>(this.route)
            .pipe(map(data => data.map(d => {
                return {
                    x: d.locationX,
                    y: d.locationY
                }
            })))
    }
}
