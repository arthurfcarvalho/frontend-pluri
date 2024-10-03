import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { PickListModule } from 'primeng/picklist';
import { ButtonModule } from 'primeng/button';
import { RoleService } from '../../../../services/role.service';
import { ToastrService } from 'ngx-toastr';
import { PermService } from '../../../../services/perm.service';
import { Permission } from '../../../../models/Permission.model';

@Component({
  selector: 'app-perm-assignment',
  standalone: true,
  imports: [
    PickListModule,
    ButtonModule
  ],
  templateUrl: './perm-assignment.component.html',
  styleUrl: './perm-assignment.component.scss'
})
export class PermAssignmentComponent implements OnChanges{
  @Input() selectedRole!: any;
  availablePerms!: Permission[];
  selectedPerms!: Permission[];

  constructor(
    private roleService: RoleService,
    private permService: PermService,
    private toastService: ToastrService
  ){}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedRole'] && changes['selectedRole'].currentValue) {
      this.clearPerms();
      this.loadPerms();
    }
  }

  clearPerms() {
    this.availablePerms = [];
    this.selectedPerms = [];
  }

  loadPerms() {
    this.permService.returnAll().subscribe(perms => {
      this.availablePerms = perms;
      this.syncPerms();
    })
  }

  syncPerms() {
    if (!this.selectedRole || !this.availablePerms.length) {
      return;
    }

    const updatedPerms = this.availablePerms.filter(perm => {
      const rolePerm = this.selectedRole.permissoes.find((rolePerm: any) => rolePerm.id === perm.id);
      if (rolePerm) {
        this.selectedPerms.push(perm);
        return false; 
      }
      return true;
    });

    this.availablePerms = updatedPerms;
  }

  savePerms() {

    const codes = this.selectedPerms.map(perm => perm.codigo);

    this.roleService.saveRoles(this.selectedRole.id, codes).subscribe({
      next: () => {
        this.toastService.success("Permissões atualizadas com sucesso!");
      },
      error: () => {
        this.toastService.error("Erro ao atualizar permissões!");
      }
    })
  }

}
