import { Routes } from "@angular/router";
import { AboutUsComponent } from "src/app/pages/about-us/about-us.component";
import { LoginComponent } from "../../pages/login/login.component";

export const AuthLayoutRoutes: Routes = [
    { path: 'login', component: LoginComponent, data: { title: 'Login' } },
];
