import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { SignupComponent } from './modules/auth/pages/signup/signup.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { CreatePluriComponent } from './modules/pluri/pages/create-pluri/create-pluri.component';
import { ListPluriComponent } from './modules/pluri/pages/list-pluri/list-pluri.component';
import { UpdatePluriComponent } from './modules/pluri/pages/update-pluri/update-pluri.component';
import { StepperComponent } from './modules/pluri/pages/stepper/stepper.component';

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
    },
    {
        path: "pluri/create-pluri",
        component: CreatePluriComponent,
        title: "Create- Pluri"
    },
    {
        path: "pluri/list",
        component: ListPluriComponent,
        title: "List - Pluri"
    },
    {
        path: "pluri/update/:id",
        component: UpdatePluriComponent,
        title: "Update - Pluri"
    },
    {
        path: "stepper",
        component: StepperComponent,
        title: " - Pluri"
    }
];
