import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PluriService } from '../../../../services/pluri.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FieldsetModule } from 'primeng/fieldset';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { PluriArea } from '../../../../models/Pluri/PluriArea.model';
import { PluriInfoDAO } from '../../../../models/Pluri/PluriInfoDAO.model';
import { User } from '../../../../models/User.model';

@Component({
  selector: 'app-indicacao-docentes',
  standalone: true,
  imports: [
    FieldsetModule,
    HeaderComponent,
    CommonModule,
    DropdownModule,
    ReactiveFormsModule
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
    {
      id: 11,
      nome: 'Maria Oliveira',
      login: 'mariaoliveira',
      senha: 'qweasd',
      data_nascimento: new Date('1985-02-02'),
      email: 'mariaoliveira@email.com',
      perfis: [] // Empty array for perfis
    },
    {
      id: 3,
      nome: 'Pedro Souza',
      login: 'pedrosouza',
      senha: 'zxcvbn',
      data_nascimento: new Date('1990-03-03'),
      email: 'pedrosouza@email.com',
      perfis: [] // Empty array for perfis
    },
    {
      id: 4,
      nome: 'Ana Costa',
      login: 'anacosta',
      senha: '123123',
      data_nascimento: new Date('1995-04-04'),
      email: 'anacosta@email.com',
      perfis: [] // Empty array for perfis
    },
    {
      id: 5,
      nome: 'Carlos Santos',
      login: 'carlossanttos',
      senha: 'qweqwe',
      data_nascimento: new Date('2000-05-05'),
      email: 'carlossanttos@email.com',
      perfis: [] // Empty array for perfis
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private pluriService: PluriService,
    private toastService: ToastrService
  ){
    this.indicacaoDocentesForm = new FormGroup({
      id_pluri: new FormControl(),
      id_usuario: new FormControl(Validators.required),
      id_pluri_area: new FormControl(Validators.required),
      quant_questoes_pedidas: new FormControl(Validators.required)
    })
  }

  ngOnInit(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if(id){
      this.pluriService.getPluriGeneralInfo(id).subscribe(pluri => {
        this.pluri = pluri;
        this.areas = this.pluri.areasPluri;
      })
    }
  }

  onAreaSelect(event: any){
    this.selectedAreaId = event.value.id_pluri_area;
  }

  onTeacherSelect(event: any) {
    this.selectedTeacher = event.value;
    if(this.selectedTeacher){
      this.teacherQuestionPairs.push({
        teacher: this.selectedTeacher,
        amount: 0
      });

      const teacherElement = document.createElement('p');
      teacherElement.textContent = `${this.selectedTeacher.nome}: `;

      const amountInput = document.createElement('input');
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
      document.getElementById('professor-questions-container')!.appendChild(teacherElement);
    }
  }

  submitIndicacaoDocentes(teacherId: number, amount: number){
    this.indicacaoDocentesForm.patchValue({
      id_pluri: this.pluri.id,
      id_usuario: teacherId,
      id_pluri_area: this.selectedAreaId,
      quant_questoes_pedidas: amount
    })
    console.log(this.indicacaoDocentesForm.value);
    this.pluriService.submitIndicacaoDocentes(this.indicacaoDocentesForm.value).subscribe({
      next: (value) => {
        this.toastService.success("Docente indicado com sucesso!");
      },
      error: (e) => {
        this.toastService.error("Erro ao indicar docente. Tente novamente!");
      },
    })
  }
  
}
