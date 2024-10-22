import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../home/components/header/header.component';
import { TableModule } from 'primeng/table';
import { Area } from '../../../models/Area.model';
import { Questao } from '../../professor/models/Question.model';
import { QuestionService } from '../../../services/question.service';
import { DadosDetalhamentoAreaPluri } from '../../ajuntador/models/DadosDetalhamentoInformacoesGerais.mode';
import { SplitterModule } from 'primeng/splitter';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { AreaService } from '../../../services/area.service';
import { HttpClient } from '@angular/common/http';
import { RelatoriosService } from '../../../services/relatorios.service';

@Component({
  selector: 'app-listar-areas',
  standalone: true,
  imports: [
    TableModule,
    HeaderComponent,
    ButtonModule,
    RouterModule,
    SplitterModule,
    PanelModule,
    DialogModule,
    DividerModule,
    CommonModule,
    DropdownModule,
  ],
  templateUrl: './listar-areas.component.html',
  styleUrl: './listar-areas.component.scss'
})
export class ListarAreasComponent {
  dataArea!: Area[];
  idArea: number | null = null; // Permitir que seja null para "Geral"
  totalRecords: number = 0;
  areasOptions: Area[] = [];
  selectedAreaId!: number;
  idQuestoesPreview: number[] = [];

  constructor(private relatorioService: RelatoriosService,private http: HttpClient, private questaoService: QuestionService, private areaService: AreaService) {}

  ngOnInit() {
    this.loadQuestoes(0, 10);

    // Requisitar áreas e adicionar a opção "Geral"
    this.areaService.returnAllAreas().subscribe(areas => {
      this.areasOptions = [{ id: 0, nome: 'Geral' }, ...areas.content];
    });
  }

  loadQuestoes(page: number, size: number) {
    // Passa null se a área selecionada for "Geral"
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
    this.loadQuestoes(0, 10); // Chama a busca ao clicar no botão
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
