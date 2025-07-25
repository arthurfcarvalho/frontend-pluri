import { Component } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { StepperModule } from 'primeng/stepper';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { PluriService } from '../../../../services/pluri.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Pluri } from '../../../../models/Pluri/Pluri.model';
import { FieldsetModule } from 'primeng/fieldset';
import moment from 'moment';
import { Area } from '../../../../models/Area.model';
import { AreaService } from '../../../../services/area.service';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { PluriArea } from '../../../../models/Pluri/PluriArea.model';

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
    CalendarModule,
    FormsModule,
    FieldsetModule,
    TableModule,
    CommonModule,
    InputNumberModule
  ],
  templateUrl: './update-pluri.component.html',
  styleUrl: './update-pluri.component.scss'
})
export class UpdatePluriComponent {

  pluri!: Pluri;
  autoGeneratedCode = '';
  informacoesGeraisForm: FormGroup;
  definirAreasPluriForm: FormGroup;
  atividadesComissaoForm: FormGroup;
  trimestreOptions = [
    {label: '1º Trimestre', value: 1},
    {label: '2º Trimestre', value: 2},
    {label: '3º Trimestre', value: 3},
    {label: '4º Trimestre', value: 4}
  ];
  areasOptions!: Area[];

  indDocentesRange!: Date[];
  envQuestoesRange!: Date[];
  diagRange!: Date[];
  revRange!: Date[];
  impRange!: Date[];
  ensalamentoRange!: Date[];
  lancNotasRange!: Date[];
  corRedacaoRange!: Date[];
  envRecursoRange!: Date[];
  analRecursoRange!: Date[];
  attNotasRange!: Date[];
  aplDate!: Date;
  reaplDate!: Date;
  divulgNotasDate!: Date;

  selectedArea: any;
  //areas: AreaQuestoesDTO[] = [];
  areas: PluriArea[] = [];

  constructor(
    private pluriService: PluriService,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private areaService: AreaService
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

    this.updateCodigo();
  }

  ngOnInit(){
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.pluriService.searchPluriById(Number(id)).subscribe(pluri => {
        this.pluri = pluri;
        //atribuindo os valores recuperados ao Form, no momento está manual, mas no futuro fazer essa conversão de maneira automática
        this.informacoesGeraisForm.patchValue({
          ...this.pluri,
          anoAplicacao: new Date(pluri.anoAplicacao, 0, 1), // convertendo pra data pois o componente p-calendar exige que seja uma data
          dataInicioPluri: this.convertISODateToDateObject(pluri.dataInicioPluri!)
        });

        this.areas = this.pluri.areasPluri || [];

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
    this.areaService.returnAllAreas().subscribe(areas => {
      this.areasOptions = areas.content;
    })
  }

  private extractYear(date: string): string {
    return new Date(date).getFullYear().toString();
  }

  private convertISODateToDateObject(isoDate: Date): Date | null {
    if(!isoDate) return null;
    return moment(isoDate).utc().toDate();
  }

  private updateCodigo() {
    const trimestreControl = this.informacoesGeraisForm.get('trimestre');
    const anoAplicacaoControl = this.informacoesGeraisForm.get('anoAplicacao');

    if (trimestreControl && anoAplicacaoControl) {
      trimestreControl.valueChanges.subscribe(() => this.generateCodigo());
      anoAplicacaoControl.valueChanges.subscribe(() => this.generateCodigo());
    }

    this.generateCodigo();
  }

  private generateCodigo(){
    const trimestre = this.informacoesGeraisForm.get('trimestre')?.value;
    const anoAplicacao = this.informacoesGeraisForm.get('anoAplicacao')?.value;

    let tempAnoAplicacao = anoAplicacao ? this.extractYear(anoAplicacao) : '';
    let tempTrimestre = trimestre ? trimestre : ' ';

    this.autoGeneratedCode = `PLU-${tempTrimestre}-${tempAnoAplicacao}`;
    this.informacoesGeraisForm.get('codigo')?.setValue(this.autoGeneratedCode);
  }

  updateAtividadesComissaoForm() {
    this.atividadesComissaoForm.get('dataInicioIndicacaoDocentes')?.setValue(this.indDocentesRange ? this.indDocentesRange[0] : null);
    this.atividadesComissaoForm.get('dataFimIndicacaoDocentes')?.setValue(this.indDocentesRange ? this.indDocentesRange[1] : null);
    this.atividadesComissaoForm.get('dataInicioEnvioQuestoes')?.setValue(this.envQuestoesRange ? this.envQuestoesRange[0] : null);
    this.atividadesComissaoForm.get('dataFimEnvioQuestoes')?.setValue(this.envQuestoesRange ? this.envQuestoesRange[1] : null);
    this.atividadesComissaoForm.get('dataInicioDiagramacao')?.setValue(this.diagRange ? this.diagRange[0] : null);
    this.atividadesComissaoForm.get('dataFimDiagramacao')?.setValue(this.diagRange ? this.diagRange[1] : null);
    this.atividadesComissaoForm.get('dataInicioRevisao')?.setValue(this.revRange ? this.revRange[0] : null);
    this.atividadesComissaoForm.get('dataFimRevisao')?.setValue(this.revRange ? this.revRange[1] : null);
    this.atividadesComissaoForm.get('dataInicioImpressao')?.setValue(this.impRange ? this.impRange[0] : null);
    this.atividadesComissaoForm.get('dataFimImpressao')?.setValue(this.impRange ? this.impRange[1] : null);
    this.atividadesComissaoForm.get('dataInicioEnsalamento')?.setValue(this.ensalamentoRange ? this.ensalamentoRange[0] : null);
    this.atividadesComissaoForm.get('dataFimEnsalamento')?.setValue(this.ensalamentoRange ? this.ensalamentoRange[1] : null);
    this.atividadesComissaoForm.get('dataInicioLancamentoNotas')?.setValue(this.lancNotasRange ? this.lancNotasRange[0] : null);
    this.atividadesComissaoForm.get('dataFimLancamentoNotas')?.setValue(this.lancNotasRange ? this.lancNotasRange[1] : null);
    this.atividadesComissaoForm.get('dataInicioCorrecaoRedacao')?.setValue(this.corRedacaoRange ? this.corRedacaoRange[0] : null);
    this.atividadesComissaoForm.get('dataFimCorrecaoRedacao')?.setValue(this.corRedacaoRange ? this.corRedacaoRange[1] : null)
    this.atividadesComissaoForm.get('dataInicioEnviarRecurso')?.setValue(this.envRecursoRange ? this.envRecursoRange[0] : null);
    this.atividadesComissaoForm.get('dataFimEnviarRecurso')?.setValue(this.envRecursoRange ? this.envRecursoRange[1] : null)
    this.atividadesComissaoForm.get('dataInicioAnaliseRecurso')?.setValue(this.analRecursoRange ? this.analRecursoRange[0] : null);
    this.atividadesComissaoForm.get('dataFimAnaliseRecurso')?.setValue(this.analRecursoRange ? this.analRecursoRange[1] : null);
    this.atividadesComissaoForm.get('dataInicioAtualizacaoNotas')?.setValue(this.attNotasRange ? this.attNotasRange[0] : null);
    this.atividadesComissaoForm.get('dataFimAtualizacaoNotas')?.setValue(this.attNotasRange ? this.attNotasRange[1] : null);
    this.atividadesComissaoForm.get('dataAplicacao')?.setValue(this.aplDate ? this.aplDate : null)
    this.atividadesComissaoForm.get('dataReaplicacao')?.setValue(this.reaplDate ? this.reaplDate : null);
    this.atividadesComissaoForm.get('dataDivulgacaoNotas')?.setValue(this.divulgNotasDate ? this.divulgNotasDate : null);
  }

  addArea() {
    if (this.selectedArea) {
      const area = this.areasOptions.find(option => option.id === this.selectedArea.id);
      if (area) {
        this.areas.push({
          idPluriArea: 0, // ou outro valor apropriado, se necessário
          pluri: this.pluri,
          area: area,
          quantidadeQuestoes: 0,
          quantidadeQuestoesRecebidas: 0,
          areaCompleta: false
        });
      }
      this.selectedArea = null;
    }
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

  saveArea(index: number) {
    const area = this.areas[index];
    this.definirAreasPluriForm.patchValue({
      id_pluri: this.pluri.id,
      id_area: area.area.id,
      quantidade_questoes: area.quantidadeQuestoes
    });

    this.pluriService.defineArea(this.definirAreasPluriForm.value).subscribe({
      next: (value) => {
        this.toastService.success(`Área ${area.area.nome} adicionada com sucesso!`);
      },
      error: (e) => {
        this.toastService.error('Erro ao adicionar a área. Tente novamente!');
      }
    });
  }


  submitAtividadesComissao(){
    this.atividadesComissaoForm.value.id = this.pluri.id;
    this.updateAtividadesComissaoForm();
    this.pluriService.updateAtividadesComissao(this.atividadesComissaoForm.value).subscribe({
      next: (value) => {
        this.toastService.success("Informações das atividades da comissão atualizadas com sucesso!");
      },
      error: (e) => {
        this.toastService.error("Erro ao atualizar informações do Pluri");
      }
    });
  }

  deleteArea(i: any) {
    const area = this.areas[i];
    let id: number = +area.idPluriArea;
    if(id){
      this.pluriService.deleteArea(id).subscribe(
        () => {
          this.toastService.success("Operação realizada com sucesso!");
        },
        (error) => {
          const errorMessage = error.error.mensagem || 'Erro desconhecido ao excluir a questão';
          this.toastService.error(errorMessage);
        }
      );
    }
  }
}
