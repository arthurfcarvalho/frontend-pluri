import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AccordionComponent } from "../../../shared/accordion/accordion.component";
import { PluriArea } from '../../../models/Pluri/PluriArea.model';
import { DadosDetalhamentoAreaPluri } from '../../ajuntador/models/DadosDetalhamentoInformacoesGerais.mode';
import { Area } from '../../../models/Area.model';
import { RelatoriosService } from '../../../services/relatorios.service';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../../../services/question.service';
import { AreaService } from '../../../services/area.service';
import { Questao } from '../../professor/models/Question.model';
import {ButtonDirective, ButtonModule} from "primeng/button";
import {InputSwitchModule} from "primeng/inputswitch";
import {TableModule} from "primeng/table";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SplitterModule} from "primeng/splitter";
import {PanelModule} from "primeng/panel";
import {DialogModule} from "primeng/dialog";
import {DividerModule} from "primeng/divider";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-accordion-areas',
  standalone: true,
  imports: [AccordionModule,
            AccordionModule,
            CommonModule,
            TableModule,
            ButtonModule,
            RouterModule,
            SplitterModule,
            PanelModule,
            DialogModule,
            DividerModule,
            DropdownModule,
            FormsModule,
            InputSwitchModule],
  templateUrl: './accordion-areas.component.html',
  styleUrl: './accordion-areas.component.scss'
})
export class AccordionAreasComponent {
  @Input()
  pluriArea!: DadosDetalhamentoAreaPluri;

  @Input() header: string = '';

  @Input() area!: Area;
  checked: boolean = false

  @Output() questaoSelecionada = new EventEmitter<{checked: boolean, questao: Questao}>();

  dataArea!: Area[];

  @Input()
  idArea: number | null = null;
  totalRecords: number = 0;
  areasOptions: Area[] = [];
  selectedAreaId!: number;
  idQuestoesPreview: number[] = [];


  @Input() tableHeaders: string[] = [];
  @Input() tableData: any[] = [];

  @Output() questoesSelecionadasChange = new EventEmitter<Questao[]>();


  questoesSelecionadas: Questao[] = [];

  constructor(private relatorioService: RelatoriosService,private http: HttpClient, private questaoService: QuestionService, private areaService: AreaService) {}

  ngOnInit() {
    this.loadQuestoes(0, 10);

    this.areaService.returnAllAreas().subscribe(areas => {
      this.areasOptions = [{ id: 0, nome: 'Geral' }, ...areas.content];
    });
  }

  onInputSwitchChange(checked: boolean, questao: Questao) {
    console.log("CHEGOU NO CHECK", checked, questao)
    if (checked) {
      if (!this.idQuestoesPreview.includes(questao.id)) {
        this.idQuestoesPreview.push(questao.id);
      }
    } else {
      this.idQuestoesPreview = this.idQuestoesPreview.filter(id => id !== questao.id);
    }
    this.questaoSelecionada.emit({checked, questao});
    console.log(this.questaoSelecionada)
  }

  gerarPdfPreviewQuestion(questao: Questao) {

    let id = 0;

    if(questao != null){
      id = questao?.id;
      console.log(questao)
    }

    this.relatorioService.previewQuestaoSelecionada(id).subscribe(
      data => {
        const url = window.URL.createObjectURL(data);
        window.open(url);
      },
      error => {
        console.error('Error fetching approved questions', error);
      }
    );
  }

  onQuestaoSelecionada(event: { questao: Questao, checked: boolean }) {
    const { questao, checked } = event;

    if (checked) {
      this.questoesSelecionadas.push(questao);
    } else {
      this.questoesSelecionadas = this.questoesSelecionadas.filter(q => q.id_questao !== questao.id_questao); // Remover se checked for false
    }

    this.questoesSelecionadasChange.emit(this.questoesSelecionadas);
  }

  loadQuestoes(page: number, size: number) {

    const areaId = this.pluriArea.areaId

    this.questaoService.listarAprovadasPorArea(areaId, page, size).subscribe(
      data => {
        this.dataArea = data.content;
        this.totalRecords = data.totalElements;
      },
      error => {
        console.error('Error fetching approved questions', error);
      }
    );
  }

  onAreaSelect(event: any) {
    this.selectedAreaId = event.value.id;
  }

  adicionarAoPreview(questaoId: number) {
    if (!this.idQuestoesPreview.includes(questaoId)) {
      this.idQuestoesPreview.push(questaoId);
    }
  }


  buscarQuestoes() {
    this.loadQuestoes(0, 10);
  }
  gerarPdfPreview() {
    const requestData = {
      questoesSelecionadas: this.idQuestoesPreview
    };

    this.relatorioService.previewQuestoesAEnviar(requestData).subscribe(
      data => {
        const url = window.URL.createObjectURL(data);
        window.open(url);
      },
      error => {
        console.error('Error fetching approved questions', error);
      }
    );
  }


}
