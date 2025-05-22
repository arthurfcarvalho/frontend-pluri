import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import { SearchUsersComponent } from "../../../user-search/pages/search-users/search-users.component";
import { RoleAssignComponent } from '../../../role-assignment/pages/role-assign/role-assign.component';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { TableModule } from 'primeng/table';
import { User } from '../../../../models/User.model';
import { DialogService } from 'primeng/dynamicdialog';
import { UserService } from '../../../../services/user.service';
import { DialogModule } from 'primeng/dialog';
import {LoginGoogleComponent} from "../login-google/login-google.component";

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [
    SearchUsersComponent,
    SearchUsersComponent,
    TableModule,
    HeaderComponent,
    DialogModule,
    ButtonModule,
    RoleAssignComponent,
    LoginGoogleComponent
  ],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss'
})
export class LoginLayoutComponent {
  @Input() title: string = "";
  @Input() primaryBtnText = "";
  @Input() secondaryBtnText = "";
  @Input() disablePrimaryBtn: boolean = false;
  @Input({transform: booleanAttribute}) isSignup: boolean = false;

  @Output("submit") onSubmit = new EventEmitter;
  @Output("navigate") onNavigate = new EventEmitter;

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
  selectedUser!: User;
  showRoleAssignmentDialog = false;
  users!: User[];

  constructor(

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
