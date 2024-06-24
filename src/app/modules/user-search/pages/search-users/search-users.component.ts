import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from '../../../../models/User.model';
import { RoleAssignComponent } from '../../../role-assignment/pages/role-assign/role-assign.component';
import { UserService } from '../../../../services/user.service';

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
  users!: User[];

  constructor(
    private dialogService: DialogService,
    private userService: UserService
  ){
    this.userService.returnAllUsers().subscribe(users => {
      this.users = users;
    })
  }

  onSelect(event: any) {
    this.selectedUser = event.data;
  }

  formatDate(date: string){

    if(date == null) return "";
    const dateParts = date.split('-');

    const day = dateParts[2];
    const month = dateParts[1];
    const year = dateParts[0];

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
