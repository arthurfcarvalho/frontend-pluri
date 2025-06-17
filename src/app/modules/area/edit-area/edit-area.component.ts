import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { HeaderComponent } from '../../home/components/header/header.component';
import { FieldsetModule } from 'primeng/fieldset';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';

import { AreaService } from '../../../services/area.service';
import { Area } from '../../../models/Area.model';

@Component({
  selector: 'app-edit-area',
  standalone: true,
  imports: [
    Button,
    FieldsetModule,
    HeaderComponent,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-area.component.html',
  styleUrls: ['./edit-area.component.scss']
})
export class EditAreaComponent {
  updateAreaForm!: FormGroup;
  areaId: number = 0;
  area!: Area;

  constructor(
    private route: ActivatedRoute,
    private toastService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private areaService: AreaService
  ) {
    this.updateAreaForm = this.formBuilder.group({

      id: new FormControl(0, Validators.required),
      nome: new FormControl('', Validators.required),
      descricao: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.areaId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.areaId) {
      this.areaService.listarPorId(this.areaId).subscribe(areaRecebida => {
        this.area = areaRecebida;
        console.log(this.area);

        this.updateAreaForm = this.formBuilder.group({
          id: new FormControl(this.area.id, Validators.required),
          nome: new FormControl(this.area.nome, Validators.required),
          descricao: new FormControl(this.area.descricao, Validators.required),
          codigo: new FormControl(this.area.codigo, Validators.required)
        });
      });
    }
  }

  submit(): void {
    const areaAtualizada = this.updateAreaForm.value;

    this.areaService.editArea(areaAtualizada).subscribe({
      next: () => {
        this.toastService.success("Área atualizada com sucesso!");
        this.router.navigate(['/pesquisar-areas']); // Ajuste conforme a rota real
      },
      error: () => {
        this.toastService.error("Erro ao atualizar a área!");
      }
    });
  }
}


