import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from 'src/app/layouts/admin-layout/admin-routing.module';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { MapComponent } from 'src/app/pages/map/map.component';

@NgModule({
    declarations: [
        HomeComponent,
        MapComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        CoolSocialLoginButtonsModule,
        MatInputModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatDialogModule,
        RouterModule.forChild(AdminLayoutRoutes),
    ],
    schemas: [
        NO_ERRORS_SCHEMA,
        CUSTOM_ELEMENTS_SCHEMA
    ],
    exports: [
        RouterModule,
    ],
})
export class AdminLayoutModule { }
