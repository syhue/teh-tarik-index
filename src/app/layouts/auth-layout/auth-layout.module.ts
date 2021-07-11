import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../core/services/user-service.service';
import { LoginComponent } from '../../pages/login/login.component';
import { AuthLayoutRoutes } from './auth-routing.module';


@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        CommonModule,
        CoolSocialLoginButtonsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(AuthLayoutRoutes),
    ],
    providers: [
        UserService,
    ],
})
export class AuthLayoutModule { }
