import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AreaService } from '../../../services/area.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from '../../home/components/header/header.component';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-area',
  standalone: true,
  imports: [
    HeaderComponent,
    FieldsetModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  templateUrl: './create-area.component.html',
  styleUrl: './create-area.component.scss'
})
export class CreateAreaComponent {

  createAreaForm: FormGroup;

  constructor(
    private areaService: AreaService,
    private toastService: ToastrService
  ) {
    this.createAreaForm = new FormGroup({
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required)
    })
  }

  submit(){
    this.areaService.createArea(this.createAreaForm.value).subscribe({
      next: (value: any) => {
        this.toastService.success("Perfil criado com sucesso!");
      },
      error: (e: any) => {
        this.toastService.error("Erro ao criar perfil!");
      }
    })
  }

}
