import { Component, Input } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AccordionTabComponent } from "../../../shared/accordion-tab/accordion-tab.component";
import { AccordionComponent } from "../../../shared/accordion/accordion.component";
import { PluriArea } from '../../../models/Pluri/PluriArea.model';
import { DadosDetalhamentoAreaPluri } from '../../ajuntador/models/DadosDetalhamentoInformacoesGerais.mode';
import { Area } from '../../../models/Area.model';
import { RelatoriosService } from '../../../services/relatorios.service';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../../../services/question.service';
import { AreaService } from '../../../services/area.service';

@Component({  
  selector: 'app-accordion-areas',
  standalone: true,
  imports: [AccordionModule, AccordionTabComponent, AccordionComponent],
  templateUrl: './accordion-areas.component.html',
  styleUrl: './accordion-areas.component.scss'
})
export class AccordionAreasComponent {
  @Input()
  pluriArea!: DadosDetalhamentoAreaPluri;


  @Input() tableHeaders: string[] = []; 
  @Input() tableData: any[] = []; 
  @Input() area!: Area;
  dataArea!: Area[];
  idArea: number | null = null;
  totalRecords: number = 0;
  areasOptions: Area[] = [];
  selectedAreaId!: number;
  idQuestoesPreview: number[] = [];

  constructor(private relatorioService: RelatoriosService,private http: HttpClient, private questaoService: QuestionService, private areaService: AreaService) {}

  ngOnInit() {
    this.loadQuestoes(0, 10);

    this.areaService.returnAllAreas().subscribe(areas => {
      this.areasOptions = [{ id: 0, nome: 'Geral' }, ...areas.content];
    });
  }

  loadQuestoes(page: number, size: number) {
  
    const areaId = this.selectedAreaId && this.selectedAreaId !== 0 ? this.selectedAreaId : null;

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
