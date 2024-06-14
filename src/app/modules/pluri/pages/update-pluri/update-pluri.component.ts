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
import moment from 'moment';

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
  definirAreasPluriForm: FormGroup;
  atividadesComissaoForm: FormGroup;
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
      nome: new FormControl('', Validators.required),
      codigo: new FormControl('', Validators.required),
      trimestre: new FormControl('', Validators.required),
      anoAplicacao: new FormControl('', Validators.required),
      dataInicioPluri: new FormControl('', Validators.required)
    });

    this.definirAreasPluriForm = new FormGroup({
      id_pluri: new FormControl(),
      id_area: new FormControl(),
      quantidade_questoes: new FormControl('', Validators.required)
    });

    this.atividadesComissaoForm = new FormGroup({
      id: new FormControl(),
      dataInicioIndicacaoDocentes: new FormControl('', Validators.required),
      dataFimIndicacaoDocentes: new FormControl('', Validators.required),
      dataInicioEnvioQuestoes: new FormControl('', Validators.required),
      dataFimEnvioQuestoes: new FormControl('', Validators.required),
      dataInicioDiagramacao: new FormControl('', Validators.required),
      dataFimDiagramacao: new FormControl('', Validators.required),
      dataInicioRevisao: new FormControl('', Validators.required),
      dataFimRevisao: new FormControl('', Validators.required),
      dataInicioImpressao: new FormControl('', Validators.required),
      dataFimImpressao: new FormControl('', Validators.required),
      dataInicioEnsalamento: new FormControl('', Validators.required),
      dataFimEnsalamento: new FormControl('', Validators.required),
      dataInicioLancamentoNotas: new FormControl('', Validators.required),
      dataFimLancamentoNotas: new FormControl('', Validators.required),
      dataInicioCorrecaoRedacao: new FormControl('', Validators.required),
      dataFimCorrecaoRedacao: new FormControl('', Validators.required),
      dataInicioEnviarRecurso: new FormControl('', Validators.required),
      dataFimEnviarRecurso: new FormControl('', Validators.required),
      dataInicioAnaliseRecurso: new FormControl('', Validators.required),
      dataFimAnaliseRecurso: new FormControl('', Validators.required),
      dataInicioAtualizacaoNotas: new FormControl('', Validators.required),
      dataFimAtualizacaoNotas: new FormControl('', Validators.required),
      dataAplicacao: new FormControl('', Validators.required),
      dataReaplicacao: new FormControl('', Validators.required),
      dataDivulgacaoNotas: new FormControl('', Validators.required)
    })
  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.pluriService.searchPluriById(Number(id)).subscribe(pluri => {
        this.pluri = pluri;
        console.log(this.pluri);
        
        //atribuindo os valores recuperados ao Form, no momento está manual, mas no futuro fazer essa conversão de maneira automática
        this.informacoesGeraisForm.patchValue({
          ...this.pluri,
          anoAplicacao: new Date(pluri.anoAplicacao, 0, 1), // convertendo pra data pois o componente p-calendar exige que seja uma data
          dataInicioPluri: this.convertISODateToDateObject(pluri.dataInicioPluri!)
        });

        this.definirAreasPluriForm.patchValue({
          ...this.pluri
        })
        
        this.atividadesComissaoForm.patchValue({
          ...this.pluri,
          dataInicioIndicacaoDocentes: this.convertISODateToDateObject(pluri.dataInicioIndicacaoDocentes!),
          dataFimIndicacaoDocentes: this.convertISODateToDateObject(pluri.dataFimIndicacaoDocentes!),
          dataInicioEnvioQuestoes: this.convertISODateToDateObject(pluri.dataInicioEnvioQuestoes!),
          dataFimEnvioQuestoes: this.convertISODateToDateObject(pluri.dataFimEnvioQuestoes!),
          dataInicioDiagramacao: this.convertISODateToDateObject(pluri.dataInicioDiagramacao!),
          dataFimDiagramacao: this.convertISODateToDateObject(pluri.dataFimDiagramacao!),
          dataInicioRevisao: this.convertISODateToDateObject(pluri.dataInicioRevisao!),
          dataFimRevisao: this.convertISODateToDateObject(pluri.dataFimRevisao!),
          dataInicioImpressao: this.convertISODateToDateObject(pluri.dataInicioImpressao!),
          dataFimImpressao: this.convertISODateToDateObject(pluri.dataFimImpressao!),
          dataInicioEnsalamento: this.convertISODateToDateObject(pluri.dataInicioEnsalamento!),
          dataFimEnsalamento: this.convertISODateToDateObject(pluri.dataFimEnsalamento!),
          dataInicioLancamentoNotas: this.convertISODateToDateObject(pluri.dataInicioLancamentoNotas!),
          dataFimLancamentoNotas: this.convertISODateToDateObject(pluri.dataFimLancamentoNotas!),
          dataInicioCorrecaoRedacao: this.convertISODateToDateObject(pluri.dataInicioCorrecaoRedacao!),
          dataFimCorrecaoRedacao: this.convertISODateToDateObject(pluri.dataFimCorrecaoRedacao!),
          dataInicioEnviarRecurso: this.convertISODateToDateObject(pluri.dataInicioEnviarRecurso!),
          dataFimEnviarRecurso: this.convertISODateToDateObject(pluri.dataFimEnviarRecurso!),
          dataInicioAnaliseRecurso: this.convertISODateToDateObject(pluri.dataInicioAnaliseRecurso!),
          dataFimAnaliseRecurso: this.convertISODateToDateObject(pluri.dataFimAnaliseRecurso!),
          dataInicioAtualizacaoNotas: this.convertISODateToDateObject(pluri.dataInicioAtualizacaoNotas!),
          dataFimAtualizacaoNotas: this.convertISODateToDateObject(pluri.dataFimAtualizacaoNotas!),
          dataAplicacao: this.convertISODateToDateObject(pluri.dataAplicacao!),
          dataReaplicacao: this.convertISODateToDateObject(pluri.dataReaplicacao!),
          dataDivulgacaoNotas: this.convertISODateToDateObject(pluri.dataDivulgacaoNotas!),
        });
      });
    }
  }

  private extractYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }

  private convertISODateToDateObject(isoDate: Date): Date | null {
    if(!isoDate) return null;
    return moment(isoDate).utc().toDate();
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

}
