import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { AreaService } from '../../../../services/area.service';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from '../../../../services/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../../../../models/Role.model';

@Component({
  selector: 'app-edit-role',
  standalone: true,
  imports: [
    HeaderComponent,
    FieldsetModule,
    InputTextModule,
    FloatLabelModule,
    DropdownModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class EditRoleComponent implements OnInit {

  editRoleForm: FormGroup;
  areaOptions!: any[];
  roleId!: number;
  role: Role = {} as Role;

  constructor(
    private areaService: AreaService,
    private toastService: ToastrService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editRoleForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      id_area: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.areaService.returnAllAreas().subscribe(data => {
      this.areaOptions = data.content;

      this.roleId = Number(this.route.snapshot.paramMap.get('id'));

      if (this.roleId) {
        this.roleService.getById(this.roleId).subscribe(role => {
          this.role = role;
          this.editRoleForm.patchValue({
            nome: this.role.nome,
            id_area: this.areaOptions.find(a => a.id === role.area.id) || null
          });
        });
      }
    });
  }

  submit() {

    if (this.editRoleForm.invalid) {
      this.editRoleForm.markAllAsTouched();
      return;
    }

    // Atualiza os campos da role com os novos valores do formulário
    this.role.nome = this.editRoleForm.value.nome;
    this.role.area = this.editRoleForm.value.id_area;

    this.roleService.update(this.role).subscribe({

      next: () => {
        this.toastService.success('Perfil atualizado com sucesso!');
        this.router.navigate(['/pesquisar-perfis']);
      },
      error: () => {
        this.toastService.error('Erro ao atualizar perfil!');
      }
    });
  }
}
