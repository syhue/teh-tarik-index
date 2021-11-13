import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Icon, Marker } from 'leaflet';
import { TehTarikDetails } from 'src/app/core/services/teh-tarik-data.service';
import { LocationService } from '../../core/services/location.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    tehTarikDetails!: TehTarikDetails[];
    summitList: any[] = [];
    map!: any;
    group!: any;

    constructor(private locationService: LocationService) { }

    ngOnInit() {
        this.map = L.map('map').setView([3.118725, 101.678834], 14);
        this.generateMaps();
        this.getTehTarikDetails();
    }

    getTehTarikDetails() {
        this.locationService.getTehTarikDetails().subscribe((data) => {
            this.tehTarikDetails = data;
            this.generateManyPointers();
        });
    }

    generateManyPointers() {
        let pointers = [];

        if (this.tehTarikDetails) {
            for (let item of this.tehTarikDetails) {
                pointers.push(this.generatePointer(item));
            }
        }
        this.group = L.featureGroup(pointers);
        this.map.fitBounds(this.group.getBounds().pad(0.5));
    }

    generatePointer(item: TehTarikDetails) {
        const msg = `Location Name: ${item.locationName}
        Latitude: ${item.coordinateX}
        Longitude: ${item.coordinateY}
        Teh Tarik Price: RM${item.price}`;

        const pointer = new Marker([parseFloat(item.coordinateX), parseFloat(item.coordinateY)], {
            icon: new Icon({
                iconSize: [25, 41],
                iconAnchor: [13, 41],
                iconUrl: 'leaflet/marker-icon.png',
                shadowUrl: 'leaflet/marker-shadow.png',
            }),
        })
            .bindTooltip(msg, { opacity: 0.95 })
            .openTooltip()
            .addTo(this.map);
        return pointer;
    }

    generateMaps() {
        L.tileLayer(
            'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
            {
                attribution:
                    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 20,
                id: 'mapbox/streets-v11',
                tileSize: 512,
                zoomOffset: -1,
                accessToken:
                    'pk.eyJ1Ijoic29va3lhbiIsImEiOiJja3VhcjVmYjgwam01MzBxcDQwa2tnY3N3In0.pJ4z2UZKsjRuSa21DiyPmA',
            }
        ).addTo(this.map);
    }
}
