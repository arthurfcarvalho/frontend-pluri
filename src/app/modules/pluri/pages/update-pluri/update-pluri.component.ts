import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { ChangeDetectorRef, Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pluri } from '../../models/Pluri.model';
import { UserService } from '../../../../services/user.service';
import { PluriService } from '../../../../services/pluri.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatTabGroup } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { DialogConfirmComponent } from '../../components/dialog-confirm/dialog-confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { CalendarEvent, CalendarModule, CalendarMonthViewDay, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CustomCalendarModule } from '../../components/custom-calendar.module';
import moment from 'moment-timezone';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import localePt from '@angular/common/locales/pt';
import localePtExtra from '@angular/common/locales/extra/pt';


type InputTypes = "text" | "email" | "password" | "date" | "number";
interface eventoPluri{
  start: Date,
  title: string
  color: {
    primary: string,
    secondary: string
  }
}

registerLocaleData(localePt, 'pt-BR', localePtExtra);
@Component({
  selector: 'app-update-pluri',
  standalone: true,
  imports: [
    HeaderComponent,
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    DialogConfirmComponent,
    MatButtonModule,
    CustomCalendarModule,
    RouterModule
  ],
   providers: [
     {
      provide: MAT_DATE_LOCALE, useValue: 'pt-BR'
    },
    provideMomentDateAdapter(),
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true}
    },
    { 
      provide: LOCALE_ID, useValue: 'pt-BR' 
    }
    ],
  templateUrl: './update-pluri.component.html',
  styleUrls: ['./update-pluri.component.scss'],
  
})
export class UpdatePluriComponent implements OnInit {
  @ViewChild(MatTabGroup) tabGroup!: MatTabGroup;
  @ViewChild(DialogConfirmComponent) dialogConfirm!: DialogConfirmComponent;

  informacoesGeraisForm!: FormGroup;
  atividadesComissaoForm!: FormGroup;
  informacoesAplicacaoForm!: FormGroup;
  selected: Date | null = null;
  messageError: string = 'Campos sem preencher';
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  locale: string = 'pt-BR';
  
  atualizarInformacoesGeraisForm!: FormGroup;
  dateString = '2024-05-11'; 
  dateObject = new Date(this.dateString);
  trimestreSelecionado: string = '';
  textNext: string = 'Proximo'
  textBack: string = 'Voltar'


  pluri: Pluri = {
    id: 0,
    codigo: '',
    trimestre: 2,
    ano_aplicacao: 2024,
    data_inicio_pluri: new Date(),
    data_inicio_recuperacao: new Date(),
    data_aplicacao: new Date(),
    data_reaplicacao: new Date(),
    data_divulgacao_notas: new Date(),
    data_indicacao_docentes: new Date(),
    data_envio_questoes: new Date(),
    data_diagramacao: new Date(),
    data_revisao: new Date(),
    data_impressao: new Date(),
    data_ensalamento: new Date(),
    data_lancamento_notas: new Date(),
    data_correcao_redacao: new Date(),
    data_enviar_recurso: new Date(),
    data_analise_recurso: new Date(),
    data_atualizacao_notas: new Date(),
    realizado: false
  };

  listaInputsInformacoesGerais = [
    { formControlName: 'codigo', type: 'text', placeholder: 'Codigo', label: 'Codigo' },
    { formControlName: 'trimestre', type: 'number', placeholder: 'Trimestre', label: 'Trimestre' },
    { formControlName: 'ano_aplicacao', type: 'text', placeholder: 'Ano Aplicacao', label: 'Ano de Aplicação' },
    { formControlName: 'data_inicio_pluri', type: 'date', placeholder: 'Data inicio', label: 'Data inicio' },
    { formControlName: 'data_inicio_recuperacao', type: 'date', placeholder: 'Data inicio recuperação', label: 'Data Inicio Recuperação' },
  ];

  listaInputsAtualizarAtividades = [
    { formControlName: 'data_indicacao_docentes', type: 'date', placeholder: 'Data Indicação Docentes', label: 'Data Indicação Docentes' },
    { formControlName: 'data_envio_questoes', type: 'date', placeholder: 'Data Envio Questoes', label: 'Data Envio Questoes' },
    { formControlName: 'data_diagramacao', type: 'date', placeholder: 'Data Diagramação', label: 'Data Diagramação' },
    { formControlName: 'data_revisao', type: 'date', placeholder: 'Data Revisao', label: 'Data Revisão' },
    { formControlName: 'data_impressao', type: 'date', placeholder: 'Data Impressao', label: 'Data impressão' },
    { formControlName: 'data_ensalamento', type: 'date', placeholder: 'Data Ensalamento', label: 'Data Ensalamento' },
    { formControlName: 'data_lancamento_notas', type: 'date', placeholder: 'Data Lancamento Notas', label: 'Data Lançamento Notas' },
    { formControlName: 'data_correcao_redacao', type: 'date', placeholder: 'Data Correção Redação', label: 'Data Correção Redação' },
    { formControlName: 'data_enviar_recurso', type: 'date', placeholder: 'Data Enviar Recurso', label: 'Data Enviar Recurso' },
    { formControlName: 'data_analise_recurso', type: 'date', placeholder: 'Data Analise Recurso', label: 'Data Analise Recurso' },
    { formControlName: 'data_atualizacao_notas', type: 'date', placeholder: 'Data Atualização Notas', label: 'Data Atualização Notas' },
  ];

  listaInputsInformacoesAplicacao = [
    { formControlName: 'data_aplicacao', type: 'date', placeholder: 'Data Aplicacao', label: 'Data Aplicação Pluri' },
    { formControlName: 'data_reaplicacao', type: 'date', placeholder: 'Data Reaplicação', label: 'Data Reaplicação' },
    { formControlName: 'data_divulgacao_notas', type: 'date', placeholder: 'Data Divulgacao Notas', label: 'Data Divulgação Notas' },
  ];

  

  constructor(
    private usuarioService: UserService,
    private formBuilder: FormBuilder,
    private pluriService: PluriService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private toastService: ToastrService,
    private cdr: ChangeDetectorRef

  ) {}

  
  ngOnInit(): void {
  this.inicializarFormularios();
  const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idNumero = Number(id);
      this.pluriService.listarPorId(idNumero).subscribe(pluriRetorno => {
        this.pluri = pluriRetorno;
        this.trimestreSelecionado = String(this.pluri.trimestre);

        this.preencherFormulariosComDados();
      });
    }
  }
  adicionarEventoAoCalendario(evento: CalendarEvent) {
    const indexEventoExistente = this.events.findIndex(e => e.title === evento.title);
    if (indexEventoExistente !== -1) {   
        this.events.splice(indexEventoExistente, 1);
    }
    this.events.push(evento);
    this.atualizarCalendario();
  }
  prevMonth() {
    this.viewDate = subMonths(this.viewDate, 1); 
  } 

  nextMonth() {
    this.viewDate = addMonths(this.viewDate, 1); 
  }

  
  atualizarCalendario() {  
    this.events = [...this.events];
  }
  getMonthName(): string {
    return format(this.viewDate, 'MMMM yyyy', { locale: ptBR });
  }
  
  get formattedDate(): string{
    return this.selected ? this.datePipe.transform(this.selected, 'dd/MM/yyyy') ?? '' : '';
  }
  

  onDateChange(dateString: string, formControlName: string): void {
    console.log("olá");
    console.log("DateString: ", dateString);

    if (dateString) {
        let dateTimeString: string = dateString + 'T15:00:00';

        let newDate: moment.Moment = moment.utc(dateTimeString);

        console.log("New date: ", newDate);

        console.log("Date: ", dateString);
        console.log("Events: ", this.events);

        const evento: eventoPluri = {
            start: newDate.toDate(),
            title: formControlName,
            color: {
                primary: '#ad2121',
                secondary: '#FAE3E3'
            }
        };

        this.adicionarEventoAoCalendario(evento);
        this.atualizarCalendario();
    }
  }
  inicializarFormularios(): void {
    this.informacoesGeraisForm = this.formBuilder.group({
      id: 0,
      codigo: '',
      trimestre: '',
      ano_aplicacao: '',
      data_inicio_pluri: '',
      data_inicio_recuperacao: '',
    });

    this.atividadesComissaoForm = this.formBuilder.group({
      id: 0,
      data_indicacao_docentes: '',
      data_envio_questoes: '',
      data_diagramacao: '',
      data_revisao: '',
      data_impressao: '',
      data_ensalamento: '',
      data_lancamento_notas: '',
      data_correcao_redacao: '',
      data_enviar_recurso: '',
      data_analise_recurso: '',
      data_atualizacao_notas: '',
    });

    this.informacoesAplicacaoForm = this.formBuilder.group({
      id: 0,
      data_aplicacao: '',
      data_reaplicacao: '',
      data_divulgacao_notas: '',
    });

    this.atualizarInformacoesGeraisForm = this.formBuilder.group({
      id: 0,
      codigo: '',
      trimestre: '',
      ano_aplicacao: '',
      data_inicio_pluri: '',
      data_inicio_recuperacao: '',
    });
  }

  preencherFormulariosComDados(): void {
    this.informacoesGeraisForm.patchValue(this.pluri);
    this.atividadesComissaoForm.patchValue(this.pluri);
    this.informacoesAplicacaoForm.patchValue(this.pluri);
    this.atualizarInformacoesGeraisForm.patchValue(this.pluri);
  }

  updateInformacoesGerais(): void {
    this.atualizarInformacoesGeraisForm.value.id = this.pluri.id;
    this.dialogConfirm.confirmResult.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.pluriService.atualizarInformacoesGerais(this.informacoesGeraisForm.value).subscribe({
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


  avancarParaProximaAba(): void {
    this.tabGroup.selectedIndex! += 1;
  }
}
