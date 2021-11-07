import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
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
        redirectTo: 'login'
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
