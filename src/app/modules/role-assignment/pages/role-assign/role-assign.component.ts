import { Component, Input } from '@angular/core';
import { User } from '../../../../models/User.model';
import { Role } from '../../../../models/Role.model';
import { PickListModule } from 'primeng/picklist';
import { RoleService } from '../../../../services/role.service';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role-assign',
  standalone: true,
  imports: [
    PickListModule,
    ButtonModule
  ],
  templateUrl: './role-assign.component.html',
  styleUrl: './role-assign.component.scss'
})

export class RoleAssignComponent {

  @Input() selectedUser!: User;
  availableRoles!: Role[];
  selectedRoles: Role[] = [];

  constructor(private roleService: RoleService, private userService: UserService, private toastService: ToastrService) {
    this.roleService.returnAllRoles().subscribe(roles => {
      this.availableRoles = roles;
    })
  }
  
  saveRoles() {
    this.userService.assignRoles(this.selectedUser.id, this.selectedRoles).subscribe({
      next: (value) => {
        this.toastService.success("Perfis atualizados com sucesso!");
        console.log(this.selectedRoles);
      },
      error: (e) => {
        this.toastService.error("Erro ao atualizar os perfis do usuário!");
      }
    });
  }

}
