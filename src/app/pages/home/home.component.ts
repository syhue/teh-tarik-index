import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleApiService } from 'ng-gapi';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PopupServiceService } from '../../components/popup/popup-service.service';
import { DEFAULT_REQUIRED_MSG } from '../../core/constants';
import { Coordinates } from '../../core/models/coordinates/coordinates';
import { Selective } from '../../core/models/options/selective-options';
import { GeoLocationService } from '../../core/services/geo-location.service';
import { IpService } from '../../core/services/ip.service';
import { TehTarikDataService } from '../../core/services/teh-tarik-data.service';
import { UserService } from '../../core/services/user-service.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    providers: [UserService, GeoLocationService, IpService, TehTarikDataService]
})
export class HomeComponent implements OnInit {

    @ViewChild('form', { static: false, read: NgForm }) form!: NgForm;
    myControl = new FormControl();
    filteredOptions!: Observable<Selective<Coordinates>[]>;
    showFormError = false;
    priceTehTarik!: number | null;
    place = "";
    locationInput: Selective<Coordinates>[] = [];
    options!: Selective<Coordinates>[];
    ipAddress!: string;
    coordinates!: any;
    errorMsg = DEFAULT_REQUIRED_MSG;
    locationName = "";

    constructor(
        private userService: UserService,
        private route: ActivatedRoute,
        private gapiService: GoogleApiService,
        private geoLocationService: GeoLocationService,
        private ipService: IpService,
        private tehTarikDataService: TehTarikDataService,
        private router: Router,
        private popupService: PopupServiceService
    ) { }

    ngOnInit() {
        this.route.fragment.subscribe();
        this.gapiService.onLoad().subscribe();
        // this.getIPaddress();
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(res => this.filter(res.value))
            );
    }

    clear() {
        this.place = "";
        this.priceTehTarik = null;
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

    // getIPaddress() {
    //     this.ipService.getIPAddress().subscribe(data => this.ipAddress = data, err => console.log(err));
    // }

    submit() {
        if (this.form.invalid) {
            this.popupService.alert('Please fill in the required fields.');
            this.showFormError = true;
            return;
        }

        const form = {
            price: this.priceTehTarik?.toString(),
            coordinateX: this.coordinates[1].toString(),
            coordinateY: this.coordinates[0].toString(),
            // ipAddress: this.ipAddress,
            locationName: this.locationName,
            userId: this.userService.getCurrentUserId()
        }
        this.tehTarikDataService.createTehTarik(form).subscribe(
            data => {
                this.popupService.alert("Submit Successfully").then(() => this.router.navigate(['map']))
            },
            err => {
                if (err.error.statusCode === 400) {
                    this.popupService.alert(err.error.message);
                }
                if (err.error.statusCode === 401) {
                    this.popupService.alert('Please login to submit');
                    this.router.navigate(['login']);
                }
            }
        );
    }

    signOut() {
        this.userService.signOut();
    }

    filter(coordinates: Coordinates): Selective<Coordinates>[] {
        const filterValue = coordinates;

        return this.options.filter(option => option.value === filterValue);
    }

    saveOption(item: {name: string, value: Coordinates}) {
        this.coordinates = item.value;
        this.locationName = item.name;
    }
}
