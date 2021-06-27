import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


const GEOLOCATION_ERRORS = {
    'errors.location.unsupportedBrowser': 'Browser does not support location services',
    'errors.location.permissionDenied': 'You have rejected access to your location',
    'errors.location.positionUnavailable': 'Unable to determine your location',
    'errors.location.timeout': 'Service timeout has been reached'
};

@Injectable()
export class GeoLocationService {

    route: string = 'https://api.openrouteservice.org/geocode/search';

    constructor(private http: HttpClient) {}

    getCurrentLocation(geoLocationOptions?: any): Observable<any> {
        geoLocationOptions = geoLocationOptions || { timeout: 5000 };

        return Observable.create((observer: any) => {

            if (window.navigator && window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(
                    (position) => {
                        observer.next(position);
                        observer.complete();
                    },
                    (error) => {
                        switch (error.code) {
                            case 1:
                                observer.error(GEOLOCATION_ERRORS['errors.location.permissionDenied']);
                                break;
                            case 2:
                                observer.error(GEOLOCATION_ERRORS['errors.location.positionUnavailable']);
                                break;
                            case 3:
                                observer.error(GEOLOCATION_ERRORS['errors.location.timeout']);
                                break;
                        }
                    },
                    geoLocationOptions);
            } else {
                observer.error(GEOLOCATION_ERRORS['errors.location.unsupportedBrowser']);
            }

        });
    }


    getLocationByName(search: string): Observable<any> {
        const params = {
            api_key: '5b3ce3597851110001cf624857bb109b2f0440dd83bfbe48780ed49b',
            text: search,
            'boundary.country': 'my',
            sources: 'openstreetmap,openaddresses,whosonfirst,geonames',
            layers: 'venue,address,region'
        }

        return this.http.get<any>(this.route, { params: params }).pipe(map((data: any) => data.features))
    }
}

export let geolocationServiceInjectables: Array<any> = [
    { provide: GeoLocationService, useClass: GeoLocationService }
];