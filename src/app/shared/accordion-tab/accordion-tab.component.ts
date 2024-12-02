import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AccordionModule, AccordionTab } from 'primeng/accordion';
import { RelatoriosService } from '../../services/relatorios.service';
import { HttpClient } from '@angular/common/http';
import { QuestionService } from '../../services/question.service';
import { AreaService } from '../../services/area.service';
import { Area } from '../../models/Area.model';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from '../../modules/home/components/header/header.component';
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-accordion-tab',
  standalone: true,
  imports: [
     AccordionModule,
     CommonModule,
     TableModule,
     ButtonModule,
     RouterModule,
     SplitterModule,
     PanelModule,
     DialogModule,
     DividerModule,
     DropdownModule],
  templateUrl: './accordion-tab.component.html',
  styleUrl: './accordion-tab.component.scss'
})
export class AccordionTabComponent {
  @Input() header: string = ''; 
  @Input() tableHeaders: string[] = []; 
  @Input() tableData: any[] = []; 
  @Input() area!: Area;
  @Input() dataArea!: Area[];
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
  }/*

  onAreaSelect(event: any) {
    this.selectedAreaId = event.value.id;
  }

  */adicionarAoPreview(questaoId: number) {
    if (!this.idQuestoesPreview.includes(questaoId)) {
      this.idQuestoesPreview.push(questaoId);
    }
  }
/*

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
  }*/

}
