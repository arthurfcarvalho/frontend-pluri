import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from '../../../../models/User.model';
import { RoleAssignComponent } from '../../../role-assignment/pages/role-assign/role-assign.component';

@Component({
  selector: 'app-search-users',
  standalone: true,
  imports: [
    TableModule,
    HeaderComponent,
    ButtonModule,
    DialogModule,
    RoleAssignComponent
  ],
  providers: [DialogService],
  templateUrl: './search-users.component.html',
  styleUrl: './search-users.component.scss'
})
export class SearchUsersComponent {

  selectedUser!: User;
  showRoleAssignmentDialog = false;

  constructor(
    private dialogService: DialogService
  ){

  }

  // por ora, usuarios ficticios, depois integrar com o back-end!
  users: User[] = [
    {
      id: 1,
      nome: 'João Silva',
      login: 'joaosilva',
      senha: 'senha123', // Note: Replace with secure password hashing
      data_nascimento: new Date('1980-01-01'),
      email: 'joaosilva@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      login: 'mariaoliveira',
      senha: 'senha456', // Note: Replace with secure password hashing
      data_nascimento: new Date('1990-02-15'),
      email: 'mariaoliveira@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 3,
      nome: 'Pedro Souza',
      login: 'pedrosouza',
      senha: 'senha789', // Note: Replace with secure password hashing
      data_nascimento: new Date('2000-03-20'),
      email: 'pedrosouza@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 4,
      nome: 'Ana Santos',
      login: 'anasantos',
      senha: 'senha1011', // Note: Replace with secure password hashing
      data_nascimento: new Date('1985-04-12'),
      email: 'anasantos@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 5,
      nome: 'Carlos Pereira',
      login: 'carlospereira',
      senha: 'senha1213', // Note: Replace with secure password hashing
      data_nascimento: new Date('1995-05-06'),
      email: 'carlospereira@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 6,
      nome: 'Bruna Costa',
      login: 'brunacosta',
      senha: 'senha1415', // Note: Replace with secure password hashing
      data_nascimento: new Date('2005-06-23'),
      email: 'brunacosta@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 7,
      nome: 'Diego Ferreira',
      login: 'diegoferreira',
      senha: 'senha1617', // Note: Replace with secure password hashing
      data_nascimento: new Date('1990-07-14'),
      email: 'diegoferreira@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 8,
      nome: 'Gabriela Almeida',
      login: 'gabrielaalmeida',
      senha: 'senha1819', // Note: Replace with secure password hashing
      data_nascimento: new Date('2000-08-08'),
      email: 'gabrielaalmeida@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 9,
      nome: 'Felipe Lima',
      login: 'felipelima',
      senha: 'senha2021', // Note: Replace with secure password hashing
      data_nascimento: new Date('1995-09-25'),
      email: 'felipelima@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 10,
      nome: 'Amanda Oliveira',
      login: 'amandaoliveira',
      senha: 'senha2223', // Note: Replace with secure password hashing
      data_nascimento: new Date('2003-10-10'),
      email: 'amandaoliveira@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 11,
      nome: 'Bruno Souza',
      login: 'brunosouza',
      senha: 'senha2425', // Note: Replace with secure password hashing
      data_nascimento: new Date('2001-11-18'),
      email: 'brunosouza@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 12,
      nome: 'Carolina Pereira',
      login: 'carolinapereira',
      senha: 'senha2627', // Note: Replace with secure password hashing
      data_nascimento: new Date('1998-12-24'),
      email: 'carolinapereira@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 13,
      nome: 'Douglas Costa',
      login: 'douglascosta',
      senha: 'senha2829', // Note: Replace with secure password hashing
      data_nascimento: new Date('2006-01-05'),
      email: 'douglascosta@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 14,
      nome: 'Eduarda Ferreira',
      login: 'eduardafereira',
      senha: 'senha3031', // Note: Replace with secure password hashing
      data_nascimento: new Date('1992-02-12'),
      email: 'eduardafereira@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    },
    {
      id: 15,
      nome: 'Fernando Almeida',
      login: 'fernandoalmeida',
      senha: 'senha3233', // Note: Replace with secure password hashing
      data_nascimento: new Date('2004-03-19'),
      email: 'fernandoalmeida@example.com',
      perfis: [], // Assuming a Role array for user roles (if applicable)
    }
  ];

  onSelect(event: any) {
    this.selectedUser = event.data;
  }

  formatDate(date: Date){
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  showModalRoleAssignment(user: User){
    this.selectedUser = user;
    this.showRoleAssignmentDialog = true;
  }

  getUserDialogHeader(): string{
    if(this.selectedUser) return `Atribuir Perfis -  ${this.selectedUser.nome}`;
    return "Atribuir Perfis";
  }
}
