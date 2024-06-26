import { Component } from '@angular/core';
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

@Component({
  selector: 'app-create-role',
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
  templateUrl: './create-role.component.html',
  styleUrl: './create-role.component.scss'
})
export class CreateRoleComponent {

  createRoleForm: FormGroup;
  areaOptions!: any[];

  constructor(
    private areaService: AreaService,
    private toastService: ToastrService,
    private roleService: RoleService
  ){
    this.createRoleForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      codigo_permissoes: new FormControl([], Validators.required),
      id_area: new FormControl('', Validators.required)
    })

    this.areaService.returnAllAreas().subscribe(data => {
      this.areaOptions = data.content;
    })
  }
  
  submit(){

    this.createRoleForm.value.id_area = this.createRoleForm.value.id_area.id;

    this.roleService.create(this.createRoleForm.value).subscribe({
      next: (value) => {
        this.toastService.success("Perfil criado com sucesso!");
      },
      error: (e) => {
        this.toastService.error("Erro ao criar perfil!");
      }
    })

    
  }

}
