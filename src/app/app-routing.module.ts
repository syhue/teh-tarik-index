import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "src/app/layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "src/app/layouts/auth-layout/auth-layout.component";

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: '', component: AdminLayoutComponent,
        children:
            [{ path: '', loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule) }]
    },
    {
        path: '', component: AuthLayoutComponent,
        children:
            [{ path: '', loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule) }]
    },
    {
        path: '**',
        redirectTo: 'home'
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
