import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { RoleService } from '../../../../services/role.service';
import { PermAssignmentComponent } from '../../components/perm-assignment/perm-assignment.component';

@Component({
  selector: 'app-search-roles',
  standalone: true,
  imports: [
    ButtonModule,
    DialogModule,
    TableModule,
    HeaderComponent,
    PermAssignmentComponent
  ],
  providers: [DialogService],
  templateUrl: './search-roles.component.html',
  styleUrl: './search-roles.component.scss'
})
export class SearchRolesComponent {

  selectedRole!: any;
  showPermAssignmentDialog = false;
  roles!: any[];

  constructor(
    private dialogService: DialogService,
    private roleService: RoleService
  ){
    this.roleService.returnAllRoles().subscribe(roles => {
      this.roles = roles;
    })
  }

  onSelect(event: any) {
    this.selectedRole = event.data;
  }

  showModalPermAssignment(role: any){
    this.selectedRole = role;
    this.showPermAssignmentDialog = true;
  }

  getRoleDialogHeader(): string{
    if(this.selectedRole) return `Atribuir Permissões -  ${this.selectedRole.nome}`;
    return "Atribuir Permissões";
  }

}
