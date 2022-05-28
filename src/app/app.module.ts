
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GoogleApiModule, NgGapiClientConfig, NG_GAPI_CONFIG } from "ng-gapi";
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from 'src/app/layouts/auth-layout/auth-layout.component';
import { AboutUsComponent } from 'src/app/pages/about-us/about-us.component';

let gapiClientConfig: NgGapiClientConfig = {
    client_id: "820064535472-bibojjttg43951e5d07q42pu2pbcoogd.apps.googleusercontent.com",
    discoveryDocs: ["https://analyticsreporting.googleapis.com/$discovery/rest?version=v4"],
    scope: [
        "https://www.googleapis.com/auth/analytics.readonly",
        "https://www.googleapis.com/auth/analytics"
    ].join(" ")
};

@NgModule({
    declarations: [
        AppComponent,
        AuthLayoutComponent,
        AdminLayoutComponent,
        AboutUsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        NgbModule,
        ComponentsModule,
        RouterModule,
        GoogleApiModule.forRoot({
            provide: NG_GAPI_CONFIG,
            useValue: gapiClientConfig
        }),
        HttpClientModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
