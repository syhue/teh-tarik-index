import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, Icon, Marker } from 'leaflet';
import { Coordinates } from '../../core/models/coordinates/coordinates';
import { LocationService } from '../../core/services/location.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

    options!: any;
    coordinatesList!: Coordinates[];
    summitList: any[] = [];

    constructor(
        private locationService: LocationService
    ) { }

    ngOnInit() {
        this.getLocation();
    }

    getLocation() {
        this.locationService.getLocation().subscribe(data => {
            this.coordinatesList = data;
            this.generateSummits();
        });
    }

    generateSummits() {
        for (let coordinates of this.coordinatesList) {
            
            const summit = new Marker([coordinates.y, coordinates.x], {
                icon: new Icon({
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                    iconUrl: 'leaflet/marker-icon.png',
                    shadowUrl: 'leaflet/marker-shadow.png'
                })
            });

            this.summitList.push(summit);
        }
        this.generateMaps();
    }

    generateMaps() {
        
        this.options = {
            layers: [ 
                tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors'
                })
            ],
            zoom: 7,
            center: latLng([3.118725, 101.678834])
        };

        this.options.layers = this.options.layers.concat(this.summitList);
    }
}
