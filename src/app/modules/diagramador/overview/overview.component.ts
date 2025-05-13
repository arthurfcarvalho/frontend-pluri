import { PanelModule } from 'primeng/panel';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { AccordionAreasComponent } from "../../components/accordion-areas/accordion-areas.component";
import { HeaderComponent } from "../../home/components/header/header.component";
import { PluriService } from '../../../services/pluri.service';
import { ActivatedRoute } from '@angular/router';
import { PluriArea } from '../../../models/Pluri/PluriArea.model';
import { CommonModule } from '@angular/common';
import { DadosDetalhamentoAreaPluri } from '../../ajuntador/models/DadosDetalhamentoInformacoesGerais.mode';
import { Questao } from '../../professor/models/Question.model';
import {RelatoriosService} from "../../../services/relatorios.service";
import {ButtonDirective, ButtonModule} from "primeng/button";
import {Pluri} from "../../../models/Pluri/Pluri.model";
import { AvatarModule } from 'primeng/avatar';
import {MenuModule} from "primeng/menu";
import {CardModule} from "primeng/card";
import {CarouselModule} from "primeng/carousel";


@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    AccordionAreasComponent,
    CommonModule,
    HeaderComponent,
    ButtonDirective,
    PanelModule,
    AvatarModule,
    ButtonModule,
    MenuModule,
    CardModule,
    CarouselModule
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit{

  idPluri!: number;

  pluriAreas!: DadosDetalhamentoAreaPluri[];

  questoesSelecionadas: Questao[] = [];

  pluri: Pluri = new Pluri();

  selectedQuestoes: Questao[] = [];
  questionReceiveModel: { checked: boolean; questao: Questao; } | undefined;



  constructor( private cdr: ChangeDetectorRef,private relatorioService: RelatoriosService,private route: ActivatedRoute, private pluriService: PluriService){}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idPluri = params.get('id')
      if(idPluri){
        const idParaNumber = +idPluri
        this.idPluri = idParaNumber
        this.pluriService.searchPluriById(idParaNumber)
          .subscribe((apiResponse)=>{
          this.pluri = apiResponse
        });
        this.pluriService.listarPluriAreasByPluri(idParaNumber, 0, 10).subscribe((apiResponse)=>{
          this.pluriAreas = apiResponse.content
        });
      }
      })
  }

  atualizarQuestoesSelecionadas(questoes: Questao[]) {
    questoes.forEach(questao => {
      this.questoesSelecionadas.push(questao);
    })
  }

  questionReceive(questionReceiveModel: { checked: boolean; questao: Questao }) {
    if (questionReceiveModel) {
      if (questionReceiveModel.checked) {
        if (!this.questoesSelecionadas.some(q => q.id === questionReceiveModel.questao.id)) {
          this.questoesSelecionadas.push(questionReceiveModel.questao);
        }
      } else {
        this.questoesSelecionadas = this.questoesSelecionadas.filter(
          questao => questao.id !== questionReceiveModel.questao.id
        );
      }
    }
    this.cdr.detectChanges();
  }

  gerarPdfPreview() {
    const requestData = {
      questoesSelecionadas: this.questoesSelecionadas.map(q => q.id),
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
  gerarTexPreview(){
    const requestData = {
      questoesSelecionadas: this.questoesSelecionadas.map(q => q.id),
    };
    this.relatorioService.downloadArquivoTexQuestoes(requestData).subscribe(
      (data: Blob) => {
        const url = window.URL.createObjectURL(data);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'questoes-selecionadas.tex'; // Nome do arquivo de download
        link.click();

        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Erro ao baixar o arquivo TEX:', error);
      }
    );

  }


}
