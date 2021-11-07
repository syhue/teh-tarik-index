import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Icon, Marker } from 'leaflet';
import { Coordinates } from '../../core/models/coordinates/coordinates';
import { LocationService } from '../../core/services/location.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
    coordinatesList!: Coordinates[];
    summitList: any[] = [];
    map!: any;

    constructor(private locationService: LocationService) { }

    ngOnInit() {
        this.map = L.map('map').setView([3.118725, 101.678834], 7);
        this.generateMaps();
        this.getLocation();
    }

    getLocation() {
        this.locationService.getLocation().subscribe((data) => {
        });
        this.coordinatesList = [
            {
                x: 3.12,
                y: 102
            },
            {
                x: 3.11,
                y: 101.1
            }
        ];
        this.generatePointers();
    }

    generatePointers() {
        for (let coordinates of this.coordinatesList) {
            const summit = new Marker([coordinates.x, coordinates.y], {
                icon: new Icon({
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                    iconUrl: 'leaflet/marker-icon.png',
                    shadowUrl: 'leaflet/marker-shadow.png',
                }),
            }).addTo(this.map);
            console.log(summit);
        }
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
