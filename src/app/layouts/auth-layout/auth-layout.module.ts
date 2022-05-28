import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from 'src/app/core/services/user-service.service';
import { AuthLayoutRoutes } from 'src/app/layouts/auth-layout/auth-routing.module';
import { LoginComponent } from 'src/app/pages/login/login.component';

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
