import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GoogleApiService, GoogleAuthService } from 'ng-gapi';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Coordinates } from '../../core/models/coordinates/coordinates';
import { Selective } from '../../core/models/options/selective-options';
import { GeoLocationService } from '../../core/services/geo-location.service';
import { IpService } from '../../core/services/ip.service';
import { TehTarikDataService } from '../../core/services/teh-tarik-data.service';
import { UserService } from '../../core/services/user-service.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @ViewChild('form', {static: false, read: NgForm}) form!: NgForm;
    myControl = new FormControl();
    filteredOptions!: Observable<Selective<Coordinates>[]>;
    showFormError = false;
    priceTehTarik!: number;
    place = "";
    locationInput: Selective<Coordinates>[] = [];
    options!: Selective<Coordinates>[];
    ipAddress!: string;
    coordinates!: Coordinates;

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private gapiService: GoogleApiService,
        private geoLocationService: GeoLocationService,
        private ipService: IpService,
        private tehTarikDataService: TehTarikDataService
    ) {}

    ngOnInit() {
        this.route.fragment.subscribe();
        this.gapiService.onLoad().subscribe();
        this.getIPaddress();
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(res => this.filter(res.value))
            );
    }

    getOptions() {
        this.locationInput = [];        
        this.geoLocationService.getLocationByName(this.place).subscribe((data: any) => {
            data.map((d: { properties: { label: string; }; geometry: { coordinates: Coordinates; }; }) => this.locationInput.push({
                name: d.properties.label,
                value: d.geometry.coordinates
            }))
        })
    }

    getIPaddress() {
        this.ipService.getIPAddress().subscribe(data => this.ipAddress = data); 
    }

    submit() {
        const form = {
            price: this.priceTehTarik,
            location: this.coordinates,
            ipAddress: this.ipAddress,
            userId: this.userService.getCurrentUserId()
        }
        console.log(form);
        this.tehTarikDataService.createTehTarik(form).subscribe(data => console.log(data));
    }

    getCoordinates(coordinates: {x: number, y: number}) {
        console.log(coordinates);
    }

    isLoggedIn(): boolean {
        return this.userService.isUserSignedIn();
    }

    signIn() {
        this.userService.signIn();
    }

    signOut() {
        this.userService.signOut();
    }

    filter(coordinates: Coordinates): Selective<Coordinates>[] {
        const filterValue = coordinates; debugger

        return this.options.filter(option => option.value === filterValue); 
    }
}