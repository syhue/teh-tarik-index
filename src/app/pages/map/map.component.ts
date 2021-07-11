import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, Icon, Marker } from 'leaflet';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {


    options!: {};

    summit = new Marker([3.11, 101.68], {
        icon: new Icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
        })
    });
    summit1 = new Marker([1.541689, 103.660102], {
        icon: new Icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
        })
    });
    summit2 = new Marker([3.142407, 101.710457], {
        icon: new Icon({
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            iconUrl: 'leaflet/marker-icon.png',
            shadowUrl: 'leaflet/marker-shadow.png'
        })
    });

    ngOnInit() {

        this.options = {
            layers: [ 
                tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; OpenStreetMap contributors'
                }),
                this.summit, this.summit1, this.summit2
            ],
            zoom: 7,
            center: latLng([3.118725, 101.678834])
        };

    }

}
