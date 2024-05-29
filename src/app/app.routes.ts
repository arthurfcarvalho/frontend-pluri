import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { SignupComponent } from './modules/auth/pages/signup/signup.component';
import { HomeComponent } from './modules/home/pages/home/home.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full",
        title: "Login - Pluri"
    },
    {
        path: "login",
        component: LoginComponent,
        title: "Login - Pluri"
    },
    {
        path: "cadastrar",
        component: SignupComponent,
        title: "Cadastrar - Pluri"
    },
    {
        path: "home",
        component: HomeComponent,
        title: "Pluri"
    }
];
