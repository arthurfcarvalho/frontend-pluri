import { DialogConfirmComponent } from './../../components/dialog-confirm/dialog-confirm.component';
import { HeaderComponent } from './../../../home/components/header/header.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { CreateLayoutComponent } from '../../components/create-layout/create-layout.component';
import { PluriInputComponent } from '../../components/pluri-input/pluri-input.component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { PluriService } from '../../../../services/pluri.service';
import { CardModule } from 'primeng/card';
import { MatTabGroup } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule, DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';



type InputTypes = "text" | "email" | "password" | "date" | "number"
@Component({
  selector: 'app-create-pluri',
  standalone: true,
  imports: [
    CreateLayoutComponent,
    PluriInputComponent,
    ReactiveFormsModule,
    CardModule,
    StepperModule,
    MatButtonModule,
    InputTextModule,
    ToggleButtonModule,
    IconFieldModule,
    InputIconModule,
    CommonModule,
    ButtonModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    HeaderComponent,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    DialogConfirmComponent
  ],
  templateUrl: './create-pluri.component.html',
  styleUrl: './create-pluri.component.scss',
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true}
    }
  ]
  
})
export class CreatePluriComponent implements OnInit{
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild(DialogConfirmComponent) dialogConfirm!: DialogConfirmComponent;

  informacoesGeraisForm!: FormGroup;
  atividadesComissaoForm!: FormGroup;
  informacoesAplicacaoForm!: FormGroup;
  idCriado = 0;
  active = 1;
  messageError: String = 'Campos sem preencher'
  textNext: string = 'Proximo'
  textBack: string = 'Voltar'
  
  selected: Date | null = null;

  get formattedDate(): string{
      return this.selected ? this.datePipe.transform(this.selected, 'dd/MM/yyyy') ?? '' : '';
  }

  
  listaInputsInformacoesGerais: { formControlName: string, type: InputTypes; placeholder: string; label: string }[] = [
    {
      formControlName: 'codigo', 
      type: 'text',
      placeholder: 'Codigo',
      label: 'Codigo',
    },
    {
      formControlName: 'trimestre', 
      type: 'number',
      placeholder: 'Trimestre',
      label: 'Trimestre',
    },
    {
      formControlName: 'ano_aplicacao', 
      type: 'text',
      placeholder: 'Ano Aplicacao',
      label: 'Ano de Aplicação',
    },
    {
      formControlName: 'data_inicio_pluri', 
      type: 'date',
      placeholder: 'Data inicio',
      label: 'Data inicio',
    },
    {
      formControlName: 'data_inicio_recuperacao', 
      type: 'date',
      placeholder: 'Data inicio recuperação',
      label: 'Data Inicio Recuperação',
    },
  ]
  listaInputsAtualizarAtividades: { formControlName: string, type: InputTypes; placeholder: string; label: string }[] = [
    {
      formControlName: 'data_indicacao_docentes', 
      type: 'date',
      placeholder: 'Data Indicação Docentes',
      label: 'Data Indicação Docentes',
    },
    {
      formControlName: 'data_envio_questoes', 
      type: 'date',
      placeholder: 'Data Envio Questoes',
      label: 'Data Envio Questoes',
    },
    {
      formControlName: 'data_diagramacao', 
      type: 'date',
      placeholder: 'Data Diagramação',
      label: 'Data Diagramação',
    },
    {
      formControlName: 'data_revisao', 
      type: 'date',
      placeholder: 'Data Revisao',
      label: 'Data Revisão',
    },
    {
      formControlName: 'data_impressao', 
      type: 'date',
      placeholder: 'Data Impressao',
      label: 'Data impressão',
    },
    {
      formControlName: 'data_ensalamento', 
      type: 'date',
      placeholder: 'Data Ensalamento',
      label: 'Data Ensalamento',
    },
    {
      formControlName: 'data_lancamento_notas', 
      type: 'date',
      placeholder: 'Data Lancamento Notas',
      label: 'Data Lançamento Notas',
    },
    {
      formControlName: 'data_correcao_redacao', 
      type: 'date',
      placeholder: 'Data Correção Redação',
      label: 'Data Correção Redação',
    },
    {
      formControlName: 'data_enviar_recurso', 
      type: 'date',
      placeholder: 'Data Enviar Recurso',
      label: 'Data Revisão',
    },
    {
      formControlName: 'data_analise_recurso', 
      type: 'date',
      placeholder: 'Data Analise Recurso',
      label: 'Data Analise Recurso',
    },
    {
      formControlName: 'data_atualizacao_notas', 
      type: 'date',
      placeholder: 'Data Atualização Notas',
      label: 'Data Atualização Notas',
    },
  ]
  listaInputsInformacoesAplicacao: { formControlName: string, type: InputTypes; placeholder: string; label: string }[] = [
    {
      formControlName: 'data_aplicacao', 
      type: 'date',
      placeholder: 'Data Aplicacao',
      label: 'Data Aplicação Pluri',
    },
    {
      formControlName: 'data_reaplicacao',
      type: 'date',
      placeholder: 'Data Reaplicação',
      label: 'Data Reaplicação',
    },
    {
      formControlName: 'data_divulgacao_notas',
      type: 'date',
      placeholder: 'Data Divulgacao Notas',
      label: 'Data Divulgação Notas',
    },
  ]

  constructor(
    private router: Router,
    private loginService: LoginService,
    private pluriService: PluriService,
    private userService: UserService,
    private toastService: ToastrService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder
  )
  {}


  ngOnInit(){
    this.inicializarFormulario();
  }
  submit() {
    
  }
  navigate() {
    this.router.navigate([""]);
  }

  sendInformacoesGeraisForm(){
    this.dialogConfirm.confirmResult.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.pluriService.criarPluri(this.informacoesGeraisForm.value).subscribe({
          next: (value) => {            
            this.toastService.success('Pluri Criado', 'Sucesso');
          },
          error: (err) => {
            if (Array.isArray(err.error)) {
              err.error.forEach((error: { campo: string, mensagem: string }) => {
                this.toastService.error(`${error.campo}: ${error.mensagem}`, 'Erro');
              });
            } else {
              this.toastService.error(`${err.error.mensagem}`, 'Erro');
            } 
          }
        });
      } else {
        console.log('Atualização cancelada');
      }
    });
    this.dialogConfirm.confirm();
  }

  updateAtividadesDaComissaoForm(){
    this.dialogConfirm.confirmResult.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.pluriService.atualizarInformacoesComissao(this.atividadesComissaoForm.value).subscribe({
          next: (value) => {            
            this.toastService.success('Informações de aplicação atualizadas com sucesso', 'Sucesso');
          },
          error: (err) => {
            if (Array.isArray(err.error)) {
              err.error.forEach((error: { campo: string, mensagem: string }) => {
                this.toastService.error(`${error.campo}: ${error.mensagem}`, 'Erro');
              });
            } else {
              this.toastService.error(`${err.error.mensagem}`, 'Erro');
            }
            
          }
        });
      } else {
        console.log('Atualização cancelada');
      }
    });
    this.dialogConfirm.confirm();
  }

  updateInformacoesAplicacaoForm() {
    this.dialogConfirm.confirmResult.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.pluriService.atualizarInformacoesAplicacao(this.informacoesAplicacaoForm.value).subscribe({
          next: (value) => {            
            this.toastService.success('Informações de aplicação atualizadas com sucesso', 'Sucesso');
          },
          error: (err) => {
            if (Array.isArray(err.error)) {
              err.error.forEach((error: { campo: string, mensagem: string }) => {
                this.toastService.error(`${error.campo}: ${error.mensagem}`, 'Erro');
              });
            } else {
              this.toastService.error(`${err.error.mensagem}`, 'Erro');
            }
            
          }
        });
      } else {
        console.log('Atualização cancelada');
      }
    });
    this.dialogConfirm.confirm();
  }


  avancarParaProximaAba() {
    this.tabGroup.selectedIndex! += 1;
  }

  inicializarFormulario() {
    this.informacoesGeraisForm = this.formBuilder.group({
      codigo: ['', Validators.required],
      trimestre: [,Validators.required],
      ano_aplicacao: [,Validators.required],
      data_inicio_pluri: [,Validators.required],
      data_inicio_recuperacao: [,Validators.required]});
    this.atividadesComissaoForm = this.formBuilder.group({
      data_indicacao_docentes: ['',Validators.required],
      data_envio_questoes: ['',Validators.required],
      data_diagramacao: ['',Validators.required],
      data_revisao:[ '',Validators.required],
      data_impressao:[ '',Validators.required],
      data_ensalamento:[ '',Validators.required],
      data_lancamento_notas:[ '',Validators.required],
      data_correcao_redacao:[ '',Validators.required],
      data_enviar_recurso:[ '',Validators.required],
      data_analise_recurso:[ '',Validators.required],
      data_atualizacao_notas:[ '',Validators.required],
    });
    this.informacoesAplicacaoForm = this.formBuilder.group({
      data_aplicacao: '',
      data_reaplicacao: '',
      data_divulgacao_notas: '',
      realizado: false
    })
  }
}