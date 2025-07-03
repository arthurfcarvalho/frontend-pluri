import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  styleUrls: ['./role-assign.component.scss']
})
export class RoleAssignComponent implements OnChanges {

  @Input() selectedUser!: any;
  availableRoles: any[] = [];
  selectedRoles: any[] = [];

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private toastService: ToastrService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedUser'] && changes['selectedUser'].currentValue) {
      this.clearRoles();
      this.loadRoles();
    }
  }

  clearRoles() {
    this.availableRoles = [];
    this.selectedRoles = [];
  }

  loadRoles() {
    this.roleService.returnAllRoles().subscribe(roles => {
      this.availableRoles = roles;
      this.syncUserRoles();
    });
  }

  syncUserRoles() {
    if (!this.selectedUser || !this.selectedUser.perfisNome || !this.availableRoles.length) {
      return;
    }

    const updatedAvailableRoles = [];

    for (const role of this.availableRoles) {
      const userRole = this.selectedUser.perfisNome.find((userRole: any) => userRole.id === role.id);
      if (userRole) {
        this.selectedRoles.push(role);
      } else {
        updatedAvailableRoles.push(role);
      }
    }

    this.availableRoles = updatedAvailableRoles;
  }

  saveRoles() {
    this.userService.assignRoles(this.selectedUser.id, this.selectedRoles).subscribe({
      next: () => {
        this.toastService.success("Perfis atualizados com sucesso!");
      },
      error: () => {
        this.toastService.error("Erro ao atualizar os perfis do usuário!");
      }
    });
  }
}
