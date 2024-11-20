import { Routes } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { Page404Component } from './views/page-404/page-404.component';
import { AdminRegisterComponent } from './views/admin/admin-register/admin-register.component';
import { ForgetPasswordComponent } from './views/forget-password/forget-password.component';
import { AdminInternManagerComponent } from './views/admin/admin-intern-manager/admin-intern-manager.component';
import { InternInternshipsComponent } from './views/intern/intern-internships/intern-internships.component';
import { InternChatComponent } from './views/intern/intern-chat/intern-chat.component';
import { authGuard } from './services/guards/auth.guard';
import { noAuthGuard } from './services/guards/no-auth.guard';
import { MainContainerComponent } from './views/shared/main-container/main-container.component';
import { AdminChatComponent } from './views/admin/admin-chat/admin-chat.component'

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate:[noAuthGuard]
    },
    {
        path: 'admin-register',
        component: AdminRegisterComponent,
        canActivate:[noAuthGuard]

    },
    {
        path:'forget-password',
        component: ForgetPasswordComponent,
        canActivate:[noAuthGuard]
    },
    {
        path:"admin",
        canActivate:[authGuard],data :{role:'admin'},
        component:MainContainerComponent,
        children : 
        [
            {path:"intern-manager",component:AdminInternManagerComponent},
            {path: '', redirectTo: 'intern-manager', pathMatch: 'full'},
            {path: 'chat', component:AdminChatComponent}
        ]
    },
    {
        path:"intern",
        canActivate:[authGuard],data :{role:'intern'},
        component:MainContainerComponent,
        children : 
        [
            {path:"internships",component:InternInternshipsComponent},
            {path: '', redirectTo: 'internships', pathMatch: 'full'},
            {path: 'chat', component:InternChatComponent}

        ]
    },
    { 
        path: '**',
        component:Page404Component }
    
];
