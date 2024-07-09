import { DadosDetalhamentoAreaPluri } from './../../models/DadosDetalhamentoInformacoesGerais.mode';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluriService } from '../../../../services/pluri.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FieldsetModule } from 'primeng/fieldset';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { User } from '../../../../models/User.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../../../services/user.service';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { DadosDetalhamentoInformacoesGerais } from '../../models/DadosDetalhamentoInformacoesGerais.mode';

@Component({
  selector: 'app-indicacao-docentes',
  standalone: true,
  imports: [
    FieldsetModule,
    HeaderComponent,
    CommonModule,
    DropdownModule,
    ReactiveFormsModule,
    InputNumberModule,
    ButtonModule,
    FormsModule,
    SplitterModule,
    PanelModule
  ],
  templateUrl: './indicacao-docentes.component.html',
  styleUrl: './indicacao-docentes.component.scss'
})
export class IndicacaoDocentesComponent {

  indicacaoDocentesForm: FormGroup;
  selectedTeacher!: User;
  selectedAreaId!: number;
  teacherQuestionPairs: { teacher: User; amount: number }[] = [];

  pluri: DadosDetalhamentoInformacoesGerais = {
    id: 1,
    nome: 'Pluri Example',
    codigo: '001',
    trimestre: 1,
    anoAplicacao: 2024,
    dataInicioPluri: new Date('2024-01-01'),
    dataFimPluri: new Date('2024-12-31'),
    areasPluri: new Set<DadosDetalhamentoAreaPluri>([]),
  }
  pluriAreas: DadosDetalhamentoAreaPluri[] = []
    

  teachers: User[] = [
    {
      id: 1,
      nome: 'Erro Silva',
      login: 'joaosilva',
      senha: '123456',
      data_nascimento: new Date('1980-01-01'),
      email: 'joaosilva@email.com',
      perfis: [] // Empty array for perfis
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private pluriService: PluriService,
    private toastService: ToastrService,
    private usuarioService: UserService
  ){
    this.indicacaoDocentesForm = new FormGroup({
      idUsuario: new FormControl(null, Validators.required),
      idPluriArea: new FormControl(null, Validators.required),
      quantQuestoesPedidas: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.pluriService.listagemParaIndicacao(id).subscribe(pluri => {
        this.pluri = pluri
        this.pluriAreas =  Array.from(pluri.areasPluri);
        console.log(this.pluriAreas)
      })
    }
    this.usuarioService.retornaProfessores().subscribe(professores => {
      this.teachers = professores.content
    })
    /*this.usuarioService.retornaProfessoresPorArea(this.selectedAreaId).subscribe(professores => {
      this.teachers = professores.content
    })*/
  }

  onAreaSelect(event: any){
    this.selectedAreaId = event.value.idPluriArea;
  }

  onTeacherSelect(event: any) {

    const selectedTeacher = event.value;

    if(selectedTeacher) {
      this.teacherQuestionPairs.push({
        teacher: selectedTeacher,
        amount: 0
      });
    }

    /* this.selectedTeacher = event.value;
    if(this.selectedTeacher){
      this.teacherQuestionPairs.push({
        teacher: this.selectedTeacher,
        amount: 0
      });

      const teacherElement = document.createElement('p');
      teacherElement.textContent = `${this.selectedTeacher.nome}: `;

      const amountInput = document.createElement('p-inputNumber');
      amountInput.[(ngModel)] = 'questionAmount';
      amountInput.type = 'number';
      amountInput.min = '1';
      amountInput.value = '0';

      const submitButton = document.createElement('button');
      submitButton.textContent = 'Salvar';
      submitButton.onclick = () => {
        const amount = parseInt(amountInput.value);
        if(amount > 0){
          this.submitIndicacaoDocentes(this.selectedTeacher.id, amount);
        }
        else{
          this.toastService.error("Selecione uma quantidade válida de questões!");
        }
      }

      teacherElement.appendChild(amountInput);
      teacherElement.appendChild(submitButton);
      document.getElementById('professor-questions-container')!.appendChild(teacherElement); */
    }

  saveAmount(teacherId: number, amount: number){
    console.log(amount);
    if(amount > 0) {
      this.indicacaoDocentesForm.patchValue({
        idUsuario: teacherId,
        idPluriArea: this.selectedAreaId,
        quantQuestoesPedidas: amount
      });
      this.submitIndicacaoDocentes();
    } else {
      this.toastService.error("Selecione uma quantidade válida de questões!");
    }
  }
  submitIndicacaoDocentes(){
    this.pluriService.submitIndicacaoDocentes(this.indicacaoDocentesForm.value).subscribe({
      next: (value) => {
        this.toastService.success("Docente indicado com sucesso!");
      },
      error: (e) => {
        this.toastService.error("Erro ao indicar docente. Tente novamente!");
      },
    });
  }
}
