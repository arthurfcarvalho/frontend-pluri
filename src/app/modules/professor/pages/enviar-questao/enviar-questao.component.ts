import { DadosDetalhamentoQuestao } from './../../models/DadosDetalhamentoQuestao.model';
import { DadosDetalhamentoQuestoesEnviadas } from './../../models/DadosDetalhamentoQuestaoEnviadas.model';
import { PluriService } from './../../../../services/pluri.service';
import { QuestionService } from './../../../../services/question.service';
import { Component } from '@angular/core';
import { HeaderComponent } from "../../../home/components/header/header.component";
import { PickListModule } from 'primeng/picklist';
import {Button, ButtonDirective} from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ActivatedRoute, Router } from '@angular/router';
import { RelatoriosService } from '../../../../services/relatorios.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { AssuntoService } from '../../../../services/assunto.service';
import { AreaService } from '../../../../services/area.service';
import { Questao } from '../../models/Question.model';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule, Location } from '@angular/common';
import { DadosDetalhamentoQuestaoAEnviar } from '../../models/DadosDetalhamentoQuestaoAEnviar.model';
import { FieldsetModule } from 'primeng/fieldset';
import { DialogModule } from 'primeng/dialog';
import { DadosAtualizarQuestao } from '../../models/DadosAtualizarQuestao.model';

@Component({
  selector: 'app-enviar-questao',
  standalone: true,
    imports: [DialogModule, FieldsetModule, HeaderComponent, PickListModule, CommonModule, ProgressSpinnerModule, Button, TableModule, CardModule, ButtonDirective],
  templateUrl: './enviar-questao.component.html',
  styleUrl: './enviar-questao.component.scss'
})
export class EnviarQuestaoComponent {
  questoesIneditas: DadosDetalhamentoQuestao[] = [];
  questoesSelecionadas: DadosDetalhamentoQuestao[] = [];
  questaoPreview!: DadosAtualizarQuestao
  carregamento: boolean = false
  pdfUrl: SafeResourceUrl | null = null;
  questaoAEnviar!: DadosDetalhamentoQuestaoAEnviar
  idQuestoesAEnviar: number[] = []
  idQuestaoEnviar: number = 0
  idArea: number = 0
  mostrarDialog = false
  questoesEnviadas: DadosDetalhamentoQuestoesEnviadas = {
    idQuestoesAEnviar: 0,
    idPluriArea: 0,
    idPluri: 0,
    nomePluri: "",
  }

  constructor(private relatorioService: RelatoriosService, private location: Location,private relatoriosService: RelatoriosService,private http: HttpClient,private areaService: AreaService, private assuntoService: AssuntoService,private questaoService: QuestionService,private fb: FormBuilder, private sanitizer: DomSanitizer, private dialog: MatDialog,private toastService: ToastrService,
    private route: ActivatedRoute, private pluriService: PluriService) {}

  ngOnInit(){
   this.route.paramMap.subscribe(params => {
    const idQuestaoAEnviarT = params.get('idQuestaoAEnviar')
    if(idQuestaoAEnviarT){
      const idParaNumber = +idQuestaoAEnviarT
      this.idQuestaoEnviar = idParaNumber
      this.pluriService.listarQuestoesAEnviarPorId(idParaNumber).subscribe((questaoAEnviar)=>{
        this.questaoAEnviar = questaoAEnviar
        this.idArea = questaoAEnviar.idArea
        this.questaoService.listQuestoesIneditasUsuarioPorArea(this.idArea).subscribe(questoes=>{
          this.questoesIneditas = questoes
        })
      })
    }
    })
  }
  enviarQuestoes(){
    this.idQuestoesAEnviar = this.questoesSelecionadas.map(questao => questao.id)
    const enviarQuestoes = {
        idQuestoesAEnviar: this.questaoAEnviar.idQuestoesAEnviar,
        idQuestoes: this.idQuestoesAEnviar,
        idPluriArea: this.questaoAEnviar.idPluriArea
    }
    this.questaoService.enviarQuestoes(enviarQuestoes).subscribe({
      next: (value) => {
        this.toastService.success("Questoes Enviadas");
      },
      error: (e) => {
        this.toastService.error(e.error.mensagem);
      }
    });
  }
  visualizarQuestoesEnviadas(){
    this.pluriService.listarQuestoesEnviadas(this.idQuestaoEnviar).subscribe((questoes)=>{
      this.mostrarDialog = true
      this.questoesEnviadas = questoes
    })
  }
  fechar(){
    this.mostrarDialog = false
  }
  voltar(){
    this.location.back()
  }
  previewQuestaoNoModelo(questao: any) {
    this.carregamento = true;
    this.questaoService.listById(questao.id).subscribe(questao =>{
      this.questaoPreview = questao
    })

    this.relatoriosService.previewQuestao(this.questaoPreview).subscribe((pdfBlob: Blob) => {
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      window.open(blobUrl)
      this.carregamento = false;
      this.toastService.success("Preview gerado com sucesso!");
    }, error => {
      this.carregamento = false;
      this.toastService.error("Erro ao gerar preview!");
    });
  }

  previewQuestoesNoModelo(){
    this.idQuestoesAEnviar = this.questoesSelecionadas.map(questao => questao.id)
    const questoesSelecionadas = {
       questoesSelecionadas: this.idQuestoesAEnviar
    }
    this.relatoriosService.previewQuestoesAEnviar(questoesSelecionadas).subscribe((pdfBlob: Blob) => {
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      window.open(blobUrl)
      this.carregamento = false;
      this.toastService.success("Preview gerado com sucesso!");
    }, error => {
      this.carregamento = false;
      this.toastService.error("Erro ao gerar preview!");
    });
  }
  gerarPdfPreviewQuestion(questao: Questao) {

    let id = 0;

    if(questao != null){
      id = questao?.id;
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
}
