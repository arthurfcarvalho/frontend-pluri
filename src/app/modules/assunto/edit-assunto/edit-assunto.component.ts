import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';

import { AssuntoService } from '../../../services/assunto.service';
import { AreaService } from '../../../services/area.service';
import Assunto from '../../../models/Assunto.model';
import { Disciplina } from "../../disciplina/models/disciplina";
import {DisciplinaService} from "../../../services/disciplina.service";
import { DadosDetalhamentoArea } from '../../../modules/disciplina/models/dados-detalhamento-area.model';

@Component({
  selector: 'app-edit-assunto',
  standalone: true,
  imports: [
    ButtonModule,
    DropdownModule,
    FieldsetModule,
    InputTextModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-assunto.component.html',
  styleUrl: './edit-assunto.component.scss'
})
export class EditAssuntoComponent {
  updateAssuntoForm!: FormGroup;
  disciplinaList: Disciplina[] = [];
  idAssunto: number = 0;
  assunto!: Assunto;

  constructor(
      private route: ActivatedRoute,
      private toastService: ToastrService,
      private router: Router,
      private formBuilder: FormBuilder,
      private assuntoService: AssuntoService,
      private disciplinaService: DisciplinaService
  ) {
    this.updateAssuntoForm = this.formBuilder.group({
      id: new FormControl(0, Validators.required),
      nome: new FormControl('', Validators.required),
      disciplina: new FormControl(null, Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadDisciplinas();

    this.idAssunto = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idAssunto) {
      this.assuntoService.findById(this.idAssunto).subscribe(assuntoRecebido => {
        this.assunto = assuntoRecebido;
        console.log(this.assunto);

        this.updateAssuntoForm.patchValue({
          id: this.assunto?.id,
          nome: this.assunto?.nome,
          disciplina: this.assunto?.disciplina
        });
      });
    }
  }

  loadDisciplinas(): void {
    this.disciplinaService.listarDisciplinas().subscribe(response => {
      this.disciplinaList = response.content;

      const disciplinaSelecionada = this.disciplinaList.find(
        d => d.id === this.assunto.disciplina.id
      );

      this.updateAssuntoForm.patchValue({disciplina: disciplinaSelecionada});

    });
  }

  onDisicplinaChange(event: any): void {
    this.updateAssuntoForm.patchValue({ disicplina: event.value });
  }

  submit(): void {
    const data = this.updateAssuntoForm.value;

    console.log(data);

    this.assuntoService.editAssunto(data).subscribe(
        () => {
          this.router.navigate(['/pesquisar-assuntos']);
          this.toastService.success('Assunto atualizado com sucesso');
        },
        error => {
          console.error(error);
          this.toastService.error('Erro ao atualizar o assunto');
        }
    );
  }
}
