import { Routes } from '@angular/router';

// Autenticação
import { LoginComponent } from './modules/auth/pages/login/login.component';
import { SignupComponent } from './modules/auth/pages/signup/signup.component';

// Home
import { HomeComponent } from './modules/home/pages/home/home.component';

// Pluri
import { CreatePluriComponent } from './modules/pluri/pages/create-pluri/create-pluri.component';
import { SearchPluriComponent } from './modules/pluri/pages/search-pluri/search-pluri.component';
import { UpdatePluriComponent } from './modules/pluri/pages/update-pluri/update-pluri.component';

// Professor
import { CreateQuestionsComponent} from './modules/professor/pages/criar-questoes/criar-questoes.component';
import { EditarQuestaoComponent } from './modules/professor/pages/editar-questao/editar-questao.component';
import { ListaQuestoesUsuarioComponent } from './modules/professor/pages/lista-questoes-usuario/lista-questoes-usuario.component';
import { ListarQuestaoAEnviarComponent } from './modules/professor/pages/listar-questao-a-enviar/listar-questao-a-enviar.component';
import { EnviarQuestaoComponent } from './modules/professor/pages/enviar-questao/enviar-questao.component';

// Ajuntador/Diagramador

import { IndicacaoDocentesComponent } from './modules/ajuntador/pages/indicacao-docentes/indicacao-docentes.component';
import { ListarPluriAreasComponent } from './modules/ajuntador/pages/indicacao-docentes/pluri-area/listar-pluri-areas/listar-pluri-areas.component';
import { ListarAreasComponent } from './modules/diagramador/listar-areas/listar-areas.component';
import { OverviewComponent } from './modules/diagramador/overview/overview.component';
import { ListaProvaComponent } from './modules/prova/lista-prova/lista-prova.component';

// Admin

import { SearchUsersComponent } from './modules/user-search/pages/search-users/search-users.component';
import { CreateRoleComponent } from './modules/role/pages/create-role/create-role.component';
import { SearchRolesComponent } from './modules/role/pages/search-roles/search-roles.component';
import { SearchAreasComponent } from './modules/area/search-areas/search-areas.component';
import { CreateAreaComponent } from './modules/area/create-area/create-area.component';
import { CreateTurmaComponent } from './modules/turma/pages/create-turma/create-turma.component';
import { SearchTurmasComponent } from './modules/turma/pages/search-turmas/search-turmas.component';

// Guards

import { authGuard } from './guards/auth.guard';
import { permGuard } from './guards/perm.guard';
import { redirectIfAuthenticatedGuard } from './guards/redirect-if-authenticated.guard';

// Error

import { DeniedAcessComponent } from './modules/error/pages/denied-acess/denied-acess.component';
import {CreateDisciplinaComponent} from "./modules/disciplina/create-disciplina/create-disciplina.component";
import {CreateAssuntoComponent} from "./modules/assunto/create-assunto/create-assunto.component";
import {ListAssuntosComponent} from "./modules/assunto/list-assuntos/list-assuntos.component";
import {ListDisciplinasComponent} from "./modules/disciplina/list-disciplinas/list-disciplinas.component";
import {LoginGoogleComponent} from "./modules/auth/components/login-google/login-google.component";

export const routes: Routes = [
    // Antes de autenticar
  { path: '', redirectTo: '/login', pathMatch: 'full', title: 'Login - Pluri' },
  { path: 'login', component: LoginComponent, title: 'Login - Pluri', canActivate: [redirectIfAuthenticatedGuard] },
  { path: 'cadastrar', component: SignupComponent, title: 'Cadastrar - Pluri' },
  { path: 'logingoogle', component: LoginGoogleComponent, title: 'Login - Google'},

  // Home
  { path: 'home', component: HomeComponent, title: 'Pluri', canActivate: [authGuard] },

  // Pluri
  { path: 'criar-pluri', component: CreatePluriComponent, title: 'Criar Pluri - Pluri', canActivate: [authGuard, permGuard], data: { perms: ['CRIAR_PLURI'] } },
  { path: 'pesquisar-pluri', component: SearchPluriComponent, title: 'Pesquisar Pluri - Pluri', canActivate: [authGuard, permGuard], data: { perms: ['CRIAR_PLURI'] } },
  { path: 'editar-pluri/:id', component: UpdatePluriComponent, title: 'Editar Pluri - Pluri', canActivate: [authGuard] },

  // Professor
  { path: 'criar-questao', component: CreateQuestionsComponent, title: 'Criar Questao - Questao', canActivate: [authGuard, permGuard], data: { perms: ['CRIAR_QUESTAO'] } },
  { path: 'criar-questao/:id', component: CreateQuestionsComponent, title: 'Criar Questao - Questao', canActivate: [authGuard, permGuard], data: { perms: ['CRIAR_QUESTAO'] } },
  { path: 'minhas-questoes', component: ListaQuestoesUsuarioComponent, title: 'Listar Questao - Questao', canActivate: [authGuard, permGuard], data: { perms: ['CRIAR_QUESTAO'] } },
  { path: 'editar-questao/:id', component: EditarQuestaoComponent, title: 'Editar Questao - Questao', canActivate: [authGuard, permGuard], data: { perms: ['CRIAR_QUESTAO'] } },
  { path: 'questoes-a-enviar', component: ListarQuestaoAEnviarComponent, title: 'Listar Questoes A Enviar - Questao', canActivate: [authGuard, permGuard], data: { perms: ['CRIAR_QUESTAO'] } },
  { path: 'lista-questoes-para-envio/:idQuestaoAEnviar', component: EnviarQuestaoComponent, canActivate: [authGuard] },

  // Ajuntador/Diagramador
  { path: 'indicar-docentes/:id', component: IndicacaoDocentesComponent, title: 'Indicar Docentes - Pluri', canActivate: [authGuard, permGuard], data: { perms: ['APROVAR_QUESTAO'] } },
  { path: 'listar-pluri-areas', component: ListarPluriAreasComponent, title: 'Listar Pluri Areas - Ajuntador', canActivate: [authGuard, permGuard], data: { perms: ['APROVAR_QUESTAO'] } },
  { path: 'listar-pluris-diagramador', component: ListaProvaComponent, title: 'Listar Pluris - Diagramador', canActivate: [authGuard] },
  { path: 'listar-questoes-aprovadas', component: ListarAreasComponent, title: 'Pesquisar Questões - Pluri', canActivate: [authGuard] },
  { path: 'overview-prova', component: OverviewComponent, title: 'Overview - Pluri', canActivate: [authGuard] },
  { path: 'overview-pluri/:id', component: OverviewComponent, title: 'Overview - Pluri', canActivate: [authGuard] },

  // Admin
  { path: 'pesquisar-usuarios', component: SearchUsersComponent, title: 'Pesquisar Usuários - Pluri', canActivate: [authGuard] },
  { path: 'criar-perfil', component: CreateRoleComponent, title: 'Criar Perfil - Pluri', canActivate: [authGuard, permGuard], data: { perms: ['CRIAR_PERFIL'] } },
  { path: 'pesquisar-perfis', component: SearchRolesComponent, title: 'Pesquisar Perfis - Pluri', canActivate: [authGuard, permGuard], data: { perms: ['CRIAR_PERFIL'] } },
  { path: 'pesquisar-areas', component: SearchAreasComponent, title: 'Pesquisar Áreas - Pluri', canActivate: [authGuard, permGuard], data: { perms: ['CRIAR_AREA'] } },
  { path: 'criar-area', component: CreateAreaComponent, title: 'Criar Área - Pluri', canActivate: [authGuard, permGuard], data: { perms: ['CRIAR_AREA'] } },
  { path: 'criar-turmas', component: CreateTurmaComponent, title: 'Criar Turma - Pluri', canActivate: [authGuard] },
  { path: 'listar-turmas', component: SearchTurmasComponent, title: 'Listar Turmas - Pluri', canActivate: [authGuard] },
  { path: 'editar-turma/:codigo', component: CreateTurmaComponent, title: 'Editar Turma - Pluri', canActivate: [authGuard] },
  { path: 'criar-disciplina', component: CreateDisciplinaComponent, title: 'Criar - Disciplina', canActivate: [authGuard] },
  { path: 'pesquisar-disciplinas', component: ListDisciplinasComponent, title: 'Editar Turma - Pluri', canActivate: [authGuard] },
  { path: 'criar-assunto', component: CreateAssuntoComponent, title: 'Criar - Assunto', canActivate: [authGuard] },
  { path: 'pesquisar-assuntos', component: ListAssuntosComponent, title: 'Pesquisar - Assuntos', canActivate: [authGuard] },

  // Error
  { path: 'acesso-negado', component: DeniedAcessComponent, title: 'Acesso Negado - Pluri', canActivate: [authGuard] },
];
