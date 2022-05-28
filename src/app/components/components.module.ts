import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PopupComponent } from './popup/popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NgbModule
    ],
    declarations:[
        NavbarComponent,
        PopupComponent
    ],
    exports: [
        NavbarComponent
    ]
})
export class ComponentsModule { }
