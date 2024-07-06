import { ApiResponse } from './../../../../types/api-response.type';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluriService } from '../../../../services/pluri.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FieldsetModule } from 'primeng/fieldset';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { PluriArea } from '../../../../models/Pluri/PluriArea.model';
import { PluriInfoDAO } from '../../../../models/Pluri/PluriInfoDAO.model';
import { User } from '../../../../models/User.model';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../../../services/user.service';

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
    FormsModule
  ],
  templateUrl: './indicacao-docentes.component.html',
  styleUrl: './indicacao-docentes.component.scss'
})
export class IndicacaoDocentesComponent {

  pluri!: PluriInfoDAO;
  indicacaoDocentesForm: FormGroup;
  areas!: PluriArea[];
  selectedTeacher!: User;
  selectedAreaId!: number;
  teacherQuestionPairs: { teacher: User; amount: number }[] = [];

  teachers: User[] = [
    {
      id: 1,
      nome: 'João Silva',
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
      id_pluri: new FormControl(),
      id_usuario: new FormControl(null, Validators.required),
      id_pluri_area: new FormControl(null, Validators.required),
      quant_questoes_pedidas: new FormControl(null, Validators.required)
    })
  }

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.pluriService.getPluriGeneralInfo(id).subscribe(pluri => {
        this.pluri = pluri
        this.pluri.nome = pluri.nome;
        this.pluri.codigo = pluri.codigo;
        this.pluri.trimestre = pluri.trimestre;
        this.areas = this.pluri.areasPluri;
      })
    }
    this.usuarioService.retornaProfessores().subscribe(professores => {
      this.teachers = professores.content
    })
  }

  onAreaSelect(event: any){
    this.selectedAreaId = event.value.id_pluri_area;
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
        id_pluri: this.pluri.id,
        id_usuario: teacherId,
        id_pluri_area: this.selectedAreaId,
        quant_questoes_pedidas: amount
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
