import { Routes } from "@angular/router";
import { HomeComponent } from "../../pages/home/home.component";
import { MapComponent } from "../../pages/map/map.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'map', component: MapComponent, data: { title: 'Map' } },
];