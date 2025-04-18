import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import { catchError, map, throwError, timeout } from 'rxjs';
import { AssuntoService } from '../../../../services/assunto.service';
import { QuestionService } from '../../../../services/question.service';
import {Component, ElementRef, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Assunto from '../../../../models/Assunto.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { Area } from '../../../../models/Area.model';
import { ListboxModule } from 'primeng/listbox';
import { AreaService } from '../../../../services/area.service';
import { RelatoriosService } from '../../../../services/relatorios.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';
import { NgxSummernoteModule } from 'ngx-summernote';
import { CheckboxModule } from 'primeng/checkbox';
import { environment } from '../../../../../environments/environment';
import {Disciplina} from "../../../disciplina/models/disciplina";
import {DisciplinaService} from "../../../../services/disciplina.service";
import {ApiResponsePageable} from "../../../../types/api-response-pageable.type";
import {DadosAtualizarQuestao} from "../../models/DadosAtualizarQuestao.model";
import {TableModule} from "primeng/table";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-criar-questoes',
  standalone: true,
  imports: [
    HeaderComponent,
    NgxSummernoteModule,
    StepperModule,
    ReactiveFormsModule,
    CalendarModule,
    FloatLabelModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    ListboxModule,
    ProgressSpinnerModule,
    CommonModule,
    ButtonModule,
    ToggleButtonModule,
    IconFieldModule,
    InputIconModule,
    CheckboxModule,
    FormsModule,
    TableModule,
    TranslatePipe,
  ],
  templateUrl: './criar-questoes.component.html',
  styleUrls: ['./criar-questoes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateQuestionsComponent implements OnInit {
  content = "Digite";
  titulo = 'Digite o titulo';
  corpo = ' ';
  fonte: string = "";
  alternativas = [
    {corpo: ' ', correta: false, posicao: 1},
    {corpo: ' ', correta: false, posicao: 2},
    {corpo: ' ', correta: false, posicao: 3},
    {corpo: ' ', correta: false, posicao: 4}
  ];
  dificuldades = ['Fácil', 'Médio', 'Difícil'];
  carregamento: boolean = false;
  pdfUrl: SafeResourceUrl | null = null;
  assuntos!: Assunto[];
  assuntosInterdiciplinares!: Assunto[];
  disciplinas: Disciplina[] = [];
  areas!: Area[];
  criarQuestaoForm: FormGroup;
  areasRecebidas!: Area[]
  showPreview = false;
  btnCriarEnviar = 'Criar';
  expandedIndexes: boolean[] = [true, true, true, true];
  @ViewChild('iframePDF', { static: false }) iframe!: ElementRef;
  ultimaAreaSelecionada: any = null;
  questao!: DadosAtualizarQuestao;


  constructor(
    private relatoriosService: RelatoriosService,
    private disciplinaService: DisciplinaService,
    private areaService: AreaService,
    private assuntoService: AssuntoService,
    private questaoService: QuestionService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private toastService: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.areaService.returnAllAreas().subscribe(areas => {
      this.areasRecebidas = areas.content
    })
    this.assuntoService.listarAssuntos().subscribe(assuntos => {
      this.assuntosInterdiciplinares = assuntos.content
    })
    this.route.paramMap.subscribe(params => {
      const idArea = params.get('id')
      if(idArea){
        this.btnCriarEnviar = 'Enviar'
        const idParaNumber = +idArea
        this.areaService.listarPorId(idParaNumber).subscribe((area)=>{
          this.criarQuestaoForm.patchValue({ area: area });
        })
      }
    })

    this.criarQuestaoForm = this.fb.group({
      titulo: new FormControl(),
      corpo: new FormControl(),
      fonte: new FormControl(),
      dificuldade: new FormControl(),
      alternativas: new FormControl(),
      alternativa1: new FormControl(),
      alternativa2: new FormControl(),
      alternativa3: new FormControl(),
      alternativa4: new FormControl(),
      assuntos: [[]],
      assuntosInterdiciplinares: [[]],
      disciplinas: [[]],
      area: new FormControl(),
      alternativaCorreta: new FormControl(),
    });
  }

  public config: SummernoteOptions = {
    airMode: false,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['picture', 'math']],
      ['custom', ['customButton']]
    ],
    lang: 'pt-BR',
    popover: {
      image: [
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']],
        ['custom', ['imageAttributes']],
      ]
    },
    uploadImagePath: `${environment.apiUrl}/controle-de-arquivos/enviar/`,
    buttons: {}

  };

  ngOnInit(): void {
  }

  get f() {
    return this.criarQuestaoForm.controls;
  }

  toggleEditor(index: number) {
    this.expandedIndexes[index] = this.expandedIndexes[index];
  }

  setCorreta(index: number) {
    this.alternativas.forEach((alternativa, i) => {
      alternativa.correta = i === index;

    });

  }

  validarAcoes(nextCallback: any){
    this.validarAlternativasCorpo(nextCallback);
  }

  verMarcado(nextCallback: any): void {
    let cont = 0;
    this.alternativas.forEach((alternativas, i) => {
      if (!alternativas.correta) {
        cont = cont + 1;
      }
    });

    if (cont === 4) {
      this.toastService.error('Escolha uma questão correta.');
    }else{
      nextCallback.emit();
    }

  }

  validarAntesDeAvancar(nextCallback: any) {
     nextCallback.emit();
    if (this.criarQuestaoForm.valid) {

    } else {
      this.toastService.error('Preencha todos os campos obrigatórios antes de avançar.');
    }
  }

  validarAntesDeAvancarCorpo(nextCallback: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.corpo , "text/html");/*interpreta o texto como html*/
    const corpoLimpo = doc.body.textContent?.trim() || "";/*se o doc tiver tags html, doc.body.textContent?.trim() || "" vai tirar as tags como <br> <p>
                                                                 e o trim() remove os espaços*/
    nextCallback.emit();
    if (corpoLimpo.length > 0) {

    } else {
      this.toastService.error('Preencha o corpo antes de avançar.');
    }
  }

  validarAlternativasCorpo(nextCallback: any) {

    const alternativasVazias = this.alternativas.some(alt => !alt.corpo.trim() || alt.corpo.trim() === "" || alt.corpo.trim() === " " || alt.corpo.trim() === "<br>");

    if (!alternativasVazias) {
      this.verMarcado(nextCallback);
    } else {
      this.toastService.error('Preencha todas as alternativas antes de avançar.');
    }
  }

  submitCriarQuestao() {
    const formValue = this.criarQuestaoForm.value;

    formValue.corpo = this.corpo;
    formValue.alternativas = this.alternativas;
    formValue.assuntos = this.criarQuestaoForm.value.assuntos.map((a: any) => a.id);
    formValue.assuntosInterdiciplinares = this.criarQuestaoForm.value.assuntosInterdiciplinares.map((a: any) => a.id);
    formValue.disciplinas = this.criarQuestaoForm.value.disciplinas.map((d: any) => d.id);
    formValue.area = this.criarQuestaoForm.value.area?.id ?? this.criarQuestaoForm.value.area;
    console.log(formValue)

    this.questaoService.createQuestion(formValue).subscribe({
      next: (value) => {
        this.toastService.success("Questao criada com sucesso!");
        this.router.navigate(['/minhas-questoes', value]);
      },
      error: () => {
        this.toastService.error("Erro ao criar a questão!");
      }
    });
  }

  previewQuestaoNoModelo() {
    this.pdfUrl = "";
    this.showPreview = true;
    // this.carregamento = true;
    const formValue = { ...this.criarQuestaoForm.value };

    formValue.corpo = this.criarQuestaoForm.value.corpo;
    if(this.criarQuestaoForm.value.fonte != ""){
      formValue.fonte = this.criarQuestaoForm.value.fonte;
    }

    formValue.area = this.criarQuestaoForm.value?.area?.id;
    formValue.assuntos = this.criarQuestaoForm.value?.assuntos.map((a: any) => a?.id);
    formValue.alternativas = this.alternativas;
    formValue.disciplinas = this.criarQuestaoForm.value?.disciplinas.map((d: any) => d?.id);

    this.relatoriosService.previewQuestao(formValue).pipe(
      timeout(30000),
      map(response => response),
      catchError(error => {
        console.error('Error while previewing question:', error);
        this.toastService.error("Erro ao gerar preview! Tente novamente mais tarde.! Evite deixar espaços em branco e quebras de linha");
        this.carregamento = false;
        return throwError(error);
      })
    ).subscribe(
      (data: any) => {

        const file = new Blob([data], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        this.fecharIframe();


        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
        this.cdr.detectChanges();
        this.toastService.success("Preview gerado com sucesso!");

        // this.carregamento = !this.carregamento;
      },
      error => {
        this.toastService.error("Erro ao gerar preview! Evite deixar espaços em branco e quebras de linha");
        this.carregamento = false;
      }
    );
  }
  fecharIframe(){
    const btnDestroiIframe = document.getElementById('btnDestroiIframe')
    const framePdf = document.getElementById('iFramePdf')
    if(framePdf){
      framePdf.remove()
    }
    if(btnDestroiIframe){
      btnDestroiIframe?.remove()
    }
    this.pdfUrl = ""
  }

  loadFieldsDisciplinas(event: any) {
    const disciplinasSelecionadas = event.value || [];

    if (disciplinasSelecionadas.length > 0) {
      const disciplinaIds = disciplinasSelecionadas.map((d: any) => d.id);

      this.assuntoService.listarTodosPorDisciplinas(disciplinaIds).subscribe(assuntosRecebidos => {
        const assuntosDaDisciplina = assuntosRecebidos;

        const assuntosSelecionados = this.criarQuestaoForm.value?.assuntos || [];
        const todosAssuntos = [
          ...assuntosDaDisciplina,
          ...assuntosSelecionados.filter(
            (asel:any) => !assuntosDaDisciplina.some(a => a.id === asel.id)
          )
        ];

        this.assuntos = todosAssuntos;

        const assuntosMatch = todosAssuntos.filter(a =>
          assuntosSelecionados.some((asel:any) => asel.id === a.id)
        );

        this.criarQuestaoForm.patchValue({
          assuntos: assuntosMatch
        });
      });
    } else {
      this.assuntos = [];
      this.criarQuestaoForm.patchValue({
        assuntos: []
      });
    }
  }
  loadFieldsArea(event: any) {
    const selectedArea = event.value ? event.value : event;

    const areaMudou = this.ultimaAreaSelecionada && this.ultimaAreaSelecionada.id !== selectedArea.id;

    if (areaMudou) {
      this.criarQuestaoForm.patchValue({
        disciplinas: [],
        assuntos: []
      });
      this.disciplinas = [];
      this.assuntos = [];
    }

    this.ultimaAreaSelecionada = selectedArea;

    this.criarQuestaoForm.patchValue({ area: selectedArea });

    this.disciplinaService.listarDisciplinasPorArea(selectedArea.id).subscribe(disciplinasRecebidas => {
      const disciplinasDaArea = disciplinasRecebidas.content;

      const disciplinasSelecionadas = this.criarQuestaoForm.get('disciplinas')?.value || [];

      const todasDisciplinas = [
        ...disciplinasDaArea,
        ...disciplinasSelecionadas.filter(
          (sel:any) => !disciplinasDaArea.some(d => d.id === sel.id)
        )
      ];

      this.disciplinas = todasDisciplinas;

      const disciplinasMatch = todasDisciplinas.filter(d =>
        disciplinasSelecionadas.some((ds:any) => ds.id === d.id)
      );

      this.criarQuestaoForm.patchValue({
        disciplinas: disciplinasMatch
      });

      const disciplinaIds = disciplinasMatch.map((d: any) => d.id);

      if (disciplinaIds.length > 0) {
        this.assuntoService.listarTodosPorDisciplinas(disciplinaIds).subscribe(assuntosRecebidos => {
          const assuntosSelecionados = this.criarQuestaoForm.get('assuntos')?.value || [];

          const todosAssuntos = [
            ...assuntosRecebidos,
            ...assuntosSelecionados.filter(
              (asel:any) => !assuntosRecebidos.some(a => a.id === asel.id)
            )
          ];

          this.assuntos = todosAssuntos;

          const assuntosMatch = todosAssuntos.filter(a =>
            assuntosSelecionados.some((asel:any) => asel.id === a.id)
          );

          this.criarQuestaoForm.patchValue({
            assuntos: assuntosMatch
          });
        });
      } else {
        this.assuntos = [];
        this.criarQuestaoForm.patchValue({ assuntos: [] });
      }
    });
  }
}
