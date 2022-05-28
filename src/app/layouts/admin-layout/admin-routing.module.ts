import { Routes } from "@angular/router";
import { AboutUsComponent } from "src/app/pages/about-us/about-us.component";
import { HomeComponent } from "src/app/pages/home/home.component";
import { MapComponent } from "src/app/pages/map/map.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'home', component: HomeComponent, data: { title: 'Home' } },
    { path: 'map', component: MapComponent, data: { title: 'Map' } },
    { path: 'about-us', component: AboutUsComponent, data: { title: 'About Us' } },
];
