import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { SignupComponent } from './modules/auth/pages/signup/signup.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { CreatePluriComponent } from './modules/pluri/pages/create-pluri/create-pluri.component';
import { SearchPluriComponent } from './modules/pluri/pages/search-pluri/search-pluri.component';
import { UpdatePluriComponent } from './modules/pluri/pages/update-pluri/update-pluri.component';
import { SearchUsersComponent } from './modules/user-search/pages/search-users/search-users.component';
import { IndicacaoDocentesComponent } from './modules/ajuntador/pages/indicacao-docentes/indicacao-docentes.component';
import { CreateRoleComponent } from './modules/role/pages/create-role/create-role.component';
import { SearchRolesComponent } from './modules/role/pages/search-roles/search-roles.component';

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
        path: "criar-pluri",
        component: CreatePluriComponent,
        title: "Criar Pluri - Pluri"
    },
    {
        path: "pesquisar-pluri",
        component: SearchPluriComponent,
        title: "Pesquisar Pluri - Pluri"
    },
    {
        path: "editar-pluri/:id",
        component: UpdatePluriComponent,
        title: "Editar Pluri - Pluri"
    },
    {
        path: "pesquisar-usuarios",
        component: SearchUsersComponent,
        title: "Pesquisar Usuários - Pluri"
    },
    {
        path: "indicar-docentes/:id",
        component: IndicacaoDocentesComponent,
        title: "Indicar Docentes - Pluri"
    },
    {
        path: "criar-perfil",
        component: CreateRoleComponent,
        title: "Criar Perfil - Pluri"
    },
    {
        path: "pesquisar-perfis",
        component: SearchRolesComponent,
        title: "Pesquisar Perfis - Pluri"
    }
];
