import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { GoogleApiModule, NgGapiClientConfig, NG_GAPI_CONFIG } from "ng-gapi";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { GeoLocationService } from './core/services/geo-location.service';
import { UserService } from './core/services/user-service.service';
import { HomeComponent } from './pages/home/home.component';



let gapiClientConfig: NgGapiClientConfig = {
    client_id: "820064535472-5q1fj0sof1qnvhaj2e4jekgv7bub62g8.apps.googleusercontent.com",
    discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
    scope: [
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/analytics"
    ].join(" ")
};

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavbarComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        NgbModule,
        FormsModule,
        GoogleApiModule.forRoot({
            provide: NG_GAPI_CONFIG,
            useValue: gapiClientConfig
        }),
        CoolSocialLoginButtonsModule,
        AutocompleteLibModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatAutocompleteModule,
        MatInputModule
    ],
    providers: [
        UserService,
        GeoLocationService
    ],
    bootstrap: [AppComponent],

    exports: [
        RouterModule
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
