import { Component, Input } from '@angular/core';
import { User } from '../../../../models/User.model';
import { Role } from '../../../../models/Role.model';
import { PickListModule } from 'primeng/picklist';

@Component({
  selector: 'app-role-assign',
  standalone: true,
  imports: [PickListModule],
  templateUrl: './role-assign.component.html',
  styleUrl: './role-assign.component.scss'
})

export class RoleAssignComponent {

  @Input() selectedUser!: User;

  // por ora, criado manualmente, depois integrar com o back-end
  availableRoles: Role[] = [
    { id: 1, nome: "Professor", usuarios: [], permissoes: [] },
    { id: 2, nome: "Administrador do Sistema", usuarios: [], permissoes: [] },
    { id: 3, nome: "Comissário", usuarios: [], permissoes: [] },
  ];

  selectedRoles: Role[] = [];

}
