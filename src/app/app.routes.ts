import { EditarQuestaoComponent } from './modules/professor/pages/editar-questao/editar-questao.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { SignupComponent } from './modules/auth/pages/signup/signup.component';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { CreatePluriComponent } from './modules/pluri/pages/create-pluri/create-pluri.component';
import { SearchPluriComponent } from './modules/pluri/pages/search-pluri/search-pluri.component';
import { UpdatePluriComponent } from './modules/pluri/pages/update-pluri/update-pluri.component';
import { SearchUsersComponent } from './modules/user-search/pages/search-users/search-users.component';
import { IndicacaoDocentesComponent } from './modules/ajuntador/pages/indicacao-docentes/indicacao-docentes.component';

import { CreateQuestionsComponent} from './modules/professor/pages/criar-questoes/criar-questoes.component';
import { ListaQuestoesUsuarioComponent } from './modules/professor/pages/lista-questoes-usuario/lista-questoes-usuario.component';
import { ListarQuestaoAEnviarComponent } from './modules/professor/pages/listar-questao-a-enviar/listar-questao-a-enviar.component';

import { ListarPluriAreasComponent } from './modules/ajuntador/pages/indicacao-docentes/pluri-area/listar-pluri-areas/listar-pluri-areas.component';

import { CreateRoleComponent } from './modules/role/pages/create-role/create-role.component';
import { SearchRolesComponent } from './modules/role/pages/search-roles/search-roles.component';
import { authGuard } from './guards/auth.guard';
import { permGuard } from './guards/perm.guard';
import { DeniedAcessComponent } from './modules/error/pages/denied-acess/denied-acess.component';
import { redirectIfAuthenticatedGuard } from './guards/redirect-if-authenticated.guard';
import { SearchAreasComponent } from './modules/area/search-areas/search-areas.component';
import { CreateAreaComponent } from './modules/area/create-area/create-area.component';
import { EnviarQuestaoComponent } from './modules/professor/pages/enviar-questao/enviar-questao.component';


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
        title: "Login - Pluri",
        canActivate: [redirectIfAuthenticatedGuard]
    },
    {
        path: "cadastrar",
        component: SignupComponent,
        title: "Cadastrar - Pluri",
        canActivate: [redirectIfAuthenticatedGuard]
    },
    {
        path: "home",
        component: HomeComponent,
        title: "Pluri",
        //canActivate: [authGuard]
    },
    {
        path: "criar-pluri",
        component: CreatePluriComponent,
        title: "Criar Pluri - Pluri",
        canActivate: [authGuard, permGuard],
        data:
        {
            perms: ['CRIAR_PLURI']
        }
    },
    {
        path: "pesquisar-pluri",
        component: SearchPluriComponent,
        title: "Pesquisar Pluri - Pluri",
        canActivate: [authGuard, permGuard],
        data:
        {
            perms: ['CRIAR_PLURI']
        }
    },
    {
        path: "editar-pluri/:id",
        component: UpdatePluriComponent,
        title: "Editar Pluri - Pluri",
        data: {
            perms: ['CRIAR_PLURI']
        }
    },
    {
        path: "pesquisar-usuarios",
        component: SearchUsersComponent,
        title: "Pesquisar Usuários - Pluri",
        canActivate: [authGuard, permGuard],
        data: {
            perms: ['CRIAR_PLURI']
        }
    },
    {
        path: "indicar-docentes/:id",
        component: IndicacaoDocentesComponent,
        title: "Indicar Docentes - Pluri",
        canActivate: [authGuard, permGuard],
        data: {
            perms: ['APROVAR_QUESTAO']
        }
    },
    {
        path: "criar-questao",
        component: CreateQuestionsComponent,
        title: "Criar Questao - Questao",
        canActivate: [authGuard, permGuard],
        data: {
            perms: ['CRIAR_QUESTAO']
        }

    },
    {
        path: "criar-questao/:id",
        component: CreateQuestionsComponent,
        title: "Criar Questao - Questao",
        canActivate: [authGuard, permGuard],
        data: {
            perms: ['CRIAR_QUESTAO']
        }
    },
    {
        path: "minhas-questoes",
        component: ListaQuestoesUsuarioComponent,
        title: "Listar Questao - Questao",
        canActivate: [authGuard, permGuard],
        data: {
            perms: ['CRIAR_QUESTAO']
        }
    },
    {
        path: "editar-questao/:id",
        component: EditarQuestaoComponent,
        canActivate: [authGuard, permGuard],
        data: {
            perms: ['CRIAR_QUESTAO']
        }
    },
    {
        path: "questoes-a-enviar",
        component: ListarQuestaoAEnviarComponent,
        canActivate: [authGuard, permGuard],
        data: {
            perms: ['CRIAR_QUESTAO']
        }
    },
    {
        path: "listar-pluri-areas",
        component: ListarPluriAreasComponent,
        canActivate: [authGuard, permGuard],
        data: {
            perms: ['APROVAR_QUESTAO']
        }
    },
    {
        path: "criar-perfil",
        component: CreateRoleComponent,
        title: "Criar Perfil - Pluri",
        canActivate: [authGuard, permGuard],
        data: {
            perms: ['CRIAR_PERFIL']
        }
    },
    {
        path: "lista-questoes-para-envio/:idQuestaoAEnviar",
        component: EnviarQuestaoComponent,
    },
    {
        path: "pesquisar-perfis",
        component: SearchRolesComponent,
        title: "Pesquisar Perfis - Pluri",
        canActivate: [authGuard, permGuard],
        data: {
            perms: ['CRIAR_PERFIL'] 
        }
    },
    {
        path: "acesso-negado",
        component: DeniedAcessComponent,
        title: "Acesso Negado - Pluri",
        canActivate: [authGuard]
    },
    {
        path: "pesquisar-areas",
        component: SearchAreasComponent,
        title: "Pesquisar Áreas - Pluri",
        canActivate: [authGuard, permGuard],
        data: {
            perms: ['CRIAR_AREA']
        }
    },
    {
        path: "criar-area",
        component: CreateAreaComponent,
        title: "Criar Área - Pluri",
        canActivate: [authGuard, permGuard],
        data: {
            perms: ['CRIAR_AREA']
        }
    }
];
