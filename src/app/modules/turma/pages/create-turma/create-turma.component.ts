import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { FieldsetModule } from 'primeng/fieldset';
import { ButtonModule } from 'primeng/button';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown'
import { ToastrService } from 'ngx-toastr';
import { AreaService } from '../../../../services/area.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-turma',
  standalone: true,
  imports: [
    HeaderComponent,
    FieldsetModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    DropdownModule,
  ],
  templateUrl: './create-turma.component.html',
  styleUrl: './create-turma.component.scss'
})
export class CreateTurmaComponent implements OnInit{
  createTurmaForm: FormGroup;
  areas: any[] = [];
  anos: any[] = [
    { label: '1º Ano', value: 1 },
    { label: '2º Ano', value: 2 },
    { label: '3º Ano', value: 3 }
  ];

  constructor(
    private areaService: AreaService,
    private toastService: ToastrService,
    private route: ActivatedRoute
  ) {
    this.createTurmaForm = new FormGroup({
      codigo: new FormControl('', [Validators.required, this.codigoValidator]),
      nome: new FormControl('', Validators.required),
      area: new FormControl(null, Validators.required),
      ano: new FormControl(null, Validators.required)
    });

    this.loadAreas();
  }

  ngOnInit(): void {
      const codigo = this.route.snapshot.paramMap.get('codigo');
      // implementar logica para efetuar patchValue no form com os dados da turma
  }

  codigoValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const regex = /^[1-3]T[A-Z]{3}$/; // formato: {ano}T{área técnica abreviada, ex: ADM}
    return regex.test(value) ? null : {invalidFormat: true}
  }

  loadAreas() {
    this.areaService.returnAllAreas().subscribe({
      next: (response: any) => {
        this.areas = response.content.map((area: any) => ({ label: area.nome, value: area.id }));
      },
      error: () => {
        this.toastService.error('Erro ao carregar áreas técnicas.');
      }
    });
  }

  submit() {
    if (this.createTurmaForm.valid) {
      // integrar com o back-end quando estiver pronto
      console.log('Dados do Formulário:', this.createTurmaForm.value);
      this.toastService.success('Turma criada com sucesso!');
    } else {
      if (this.createTurmaForm.hasError('invalidFormat', 'codigo')) {
        this.toastService.error(
          'O código deve seguir o formato:<br><br>{ANO} + T + {ÁREA TÉCNICA ABREVIADA}.<br><br>Exemplo: 1TADM',
          'Erro no Código.',
          { enableHtml: true }
        );
      } else {
        this.toastService.error('Preencha todos os campos corretamente!');
      }
    }
  }
}
