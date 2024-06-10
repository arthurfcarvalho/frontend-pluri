import { Component } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { StepperModule } from 'primeng/stepper';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { PluriService } from '../../../../services/pluri.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Pluri } from '../../../../models/Pluri/Pluri.model';

@Component({
  selector: 'app-update-pluri',
  standalone: true,
  imports: [
    HeaderComponent,
    StepperModule,
    ReactiveFormsModule,
    FloatLabelModule,
    DropdownModule,
    InputTextModule,
    CalendarModule
  ],
  templateUrl: './update-pluri.component.html',
  styleUrl: './update-pluri.component.scss'
})
export class UpdatePluriComponent {

  pluri!: Pluri;
  informacoesGeraisForm: FormGroup;
  atividadesComissaoForm: FormGroup;
  informacoesAplicacaoForm: FormGroup;
  trimestreOptions = [
    {label: '1º Trimestre', value: 1},
    {label: '2º Trimestre', value: 2},
    {label: '3º Trimestre', value: 3},
    {label: '4º Trimestre', value: 4}
  ];

  constructor(
    private pluriService: PluriService,
    private toastService: ToastrService,
    private route: ActivatedRoute
  ){
    this.informacoesGeraisForm = new FormGroup({
      id: new FormControl(),
      codigo: new FormControl('', Validators.required),
      trimestre: new FormControl('', Validators.required),
      ano_aplicacao: new FormControl('', Validators.required),
      data_inicio_pluri: new FormControl('', Validators.required),
      data_inicio_recuperacao: new FormControl('', Validators.required)
    });

    this.atividadesComissaoForm = new FormGroup({
      id: new FormControl(),
      data_indicacao_docentes: new FormControl('', Validators.required),
      data_envio_questoes: new FormControl('', Validators.required),
      data_diagramacao: new FormControl('', Validators.required),
      data_revisao: new FormControl('', Validators.required),
      data_impressao: new FormControl('', Validators.required),
      data_ensalamento: new FormControl('', Validators.required),
      data_lancamento_notas: new FormControl('', Validators.required),
      data_correcao_redacao: new FormControl('', Validators.required),
      data_enviar_recurso: new FormControl('', Validators.required),
      data_analise_recurso: new FormControl('', Validators.required),
      data_atualizacao_notas: new FormControl('', Validators.required)
    })

    this.informacoesAplicacaoForm = new FormGroup({
      id: new FormControl(),
      data_aplicacao: new FormControl(''),
      data_reaplicacao: new FormControl(''),
      data_divulgacao_notas: new FormControl('')
    })
  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.pluriService.searchPluriById(Number(id)).subscribe(pluri => {
        this.pluri = pluri;
        console.log(pluri);
        
        //atribuindo os valores recuperados ao Form, no momento está manual, mas no futuro fazer essa conversão de maneira automática
        this.informacoesGeraisForm.patchValue({
          ...this.pluri,
          ano_aplicacao: new Date(pluri.anoAplicacao, 0, 1), // convertendo pra data pois o componente p-calendar exige que seja uma data
          data_inicio_pluri: this.pluri.dataInicioPluri ? this.convertISODateToDateObject(pluri.dataInicioPluri!.toString()) : null,
          data_inicio_recuperacao: this.pluri.dataReaplicacao ? this.convertISODateToDateObject(pluri.dataReaplicacao!.toString()) : null
        });
        
        this.atividadesComissaoForm.patchValue({
          ...this.pluri,
          data_indicacao_docentes: this.pluri.dataInicioIndicacaoDocentes ? this.convertISODateToDateObject(pluri.dataInicioIndicacaoDocentes!.toString()) : null,
          data_envio_questoes: this.pluri.dataInicioEnvioQuestoes ? this.convertISODateToDateObject(pluri.dataInicioEnvioQuestoes!.toString()) : null,
          data_diagramacao: this.pluri.dataInicioDiagramacao ? this.convertISODateToDateObject(pluri.dataInicioDiagramacao!.toString()) : null,
          data_revisao: this.pluri.dataInicioRevisao ? this.convertISODateToDateObject(pluri.dataInicioRevisao!.toString()) : null,
          data_impressao: this.pluri.dataInicioImpressao ? this.convertISODateToDateObject(pluri.dataInicioImpressao!.toString()) : null,
          data_ensalamento: this.pluri.dataInicioEnsalamento ? this.convertISODateToDateObject(pluri.dataInicioEnsalamento!.toString()) : null,
          data_lancamento_notas: this.pluri.dataInicioLancamentoNotas ? this.convertISODateToDateObject(pluri.dataInicioLancamentoNotas!.toString()) : null,
          data_correcao_redacao: this.pluri.dataInicioCorrecaoRedacao ? this.convertISODateToDateObject(pluri.dataInicioCorrecaoRedacao!.toString()) : null,
          data_enviar_recurso: this.pluri.dataInicioEnviarRecurso ? this.convertISODateToDateObject(pluri.dataInicioEnviarRecurso!.toString()) : null,
          data_analise_recurso: this.pluri.dataInicioAnaliseRecurso ? this.convertISODateToDateObject(pluri.dataInicioAnaliseRecurso!.toString()) : null,
          data_atualizacao_notas: this.pluri.dataInicioAtualizacaoNotas ? this.convertISODateToDateObject(pluri.dataInicioAtualizacaoNotas!.toString()) : null
        });
        
        this.informacoesAplicacaoForm.patchValue({
          ...this.pluri,
          data_aplicacao: this.pluri.dataAplicacao ? this.convertISODateToDateObject(pluri.dataAplicacao!.toString()) : null,
          data_reaplicacao: this.pluri.dataReaplicacao ? this.convertISODateToDateObject(pluri.dataReaplicacao!.toString()) : null,
          data_divulgacao_notas: this.pluri.dataDivulgacaoNotas ? this.convertISODateToDateObject(pluri.dataDivulgacaoNotas!.toString()) : null
        });
      })
    }
  }

  private extractYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }

  private convertISODateToDateObject(isoDate: string | null): Date | null {
    if(!isoDate) return null;

    const timestamp = Date.parse(isoDate);
    return new Date(timestamp);
  }

  submitInformacoesGerais(){

    this.informacoesGeraisForm.value.id = this.pluri.id;
    const formValue = this.informacoesGeraisForm.value;
    formValue.ano_aplicacao = this.extractYear(formValue.ano_aplicacao);

    this.pluriService.updateInformacoesGerais(this.informacoesGeraisForm.value).subscribe({
      next: (value) => {
        this.toastService.success("Informações gerais do Pluri atualizadas com sucesso!");
      },
      error: (e) => {
        this.toastService.error("Erro ao salvar as informações gerais do Pluri!");
      }
    });
  }

  submitAtividadesComissao(){

    this.atividadesComissaoForm.value.id = this.pluri.id;
    this.pluriService.updateAtividadesComissao(this.atividadesComissaoForm.value).subscribe({
      next: (value) => {
        this.toastService.success("Informações das atividades da comissão atualizadas com sucesso!");
      },
      error: (e) => {
        this.toastService.error("Erro ao atualizar informações do Pluri");
      }
    });
  }

  submitInformacoesAplicacaoForm(){

    this.informacoesAplicacaoForm.value.id = this.pluri.id;
    this.pluriService.updateInformacoesAplicacao(this.informacoesAplicacaoForm.value).subscribe({
      next:(value) => {
        this.toastService.success("Informações das atividades da aplicação do Pluri atualizadas com sucesso!");
      },
      error: (e) => {
        this.toastService.error("Erro ao atualizar informações do Pluri");
      }
    });
  }
}
