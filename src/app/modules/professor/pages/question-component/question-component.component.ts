import {ElementRef, OnInit, ViewChild} from '@angular/core';
import {Button, ButtonModule} from "primeng/button";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {DadosAtualizarQuestao} from "../../models/DadosAtualizarQuestao.model";
import Assunto from "../../../../models/Assunto.model";
import {Area} from "../../../../models/Area.model";
import {Alternativa} from "../../models/Alternativa.model";
import {Disciplina} from "../../../disciplina/models/disciplina";
import {DisciplinaService} from "../../../../services/disciplina.service";
import {AreaService} from "../../../../services/area.service";
import {RelatoriosService} from "../../../../services/relatorios.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AssuntoService} from "../../../../services/assunto.service";
import {QuestionService} from "../../../../services/question.service";
import {SummernoteOptions} from "ngx-summernote/lib/summernote-options";
import {environment} from "../../../../../environments/environment";
import {catchError, map, throwError, timeout} from "rxjs";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {PlainQuestion} from "../../models/PlainQuestion.model";
import TurndownService from "turndown";
import {ToastrService} from 'ngx-toastr';
import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgxSummernoteModule} from 'ngx-summernote';
import {StepperModule} from 'primeng/stepper';
import {CalendarModule} from 'primeng/calendar';
import {FloatLabelModule} from 'primeng/floatlabel';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext'
import {MultiSelectModule} from 'primeng/multiselect';
import {ListboxModule} from 'primeng/listbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CommonModule} from '@angular/common';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {CheckboxModule} from "primeng/checkbox";
import {InputSwitchModule} from "primeng/inputswitch";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-question-component',
  standalone: true,
  imports: [
    StepperModule,
    Button,
    DropdownModule,
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    NgxSummernoteModule,
    StepperModule,
    ReactiveFormsModule,
    CalendarModule,
    FloatLabelModule,
    DropdownModule,
    InputTextModule,
    MultiSelectModule,
    StepperModule,
    ListboxModule,
    ProgressSpinnerModule,
    CommonModule,
    ButtonModule,
    ToggleButtonModule,
    IconFieldModule,
    InputIconModule,
    CheckboxModule,
    FormsModule,
    InputSwitchModule,
    TranslatePipe,
  ],
  templateUrl: './question-component.component.html',
  styleUrl: './question-component.component.scss'
})
export class QuestionComponent implements OnInit{
  isCreate: boolean = true;
  idQuestao: number = 0;
  corpo = " ";
  fonte: string = "";
  pdfUrl: SafeResourceUrl | null = null;
  atualizarQuestaoForm: FormGroup;
  questao!: DadosAtualizarQuestao;
  previewContent = '';
  dificuldades = ['Fácil', 'Médio', 'Difícil'];
  assuntos!: Assunto[];
  carregamento: boolean = false;
  showPreview = false;
  areasRecebidas!: Area[]
  areaQuestao!: Area
  expandedIndexes: boolean[] = [true, true, true, true];
  alternativas: Alternativa[] = [];
  disciplinas: Disciplina[] = [];
  areas!: Area[];
  assuntosInterdisciplinares!: Assunto[];
  disciplinasFiltroIntegracao: Disciplina[] = [];
  areasFiltroIntegracao!: Area[];
  ultimaAreaSelecionadaInterdisciplinar: any = null;

  criarQuestaoForm: FormGroup;
  btnCriarAtualizarEnviar = 'Criar';
  @ViewChild('iframePDF', {static: false}) iframe!: ElementRef;
  ultimaAreaSelecionada: any = null;

  constructor(
    private disciplinaService: DisciplinaService,
    private areaService: AreaService,
    private relatoriosService: RelatoriosService,
    private fb: FormBuilder, private router: Router,
    private toastService: ToastrService,
    private assuntoService: AssuntoService,
    private questaoService: QuestionService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute) {
    this.atualizarQuestaoForm = this.fb.group({
      titulo: new FormControl('', Validators.required),
      corpo: new FormControl('', Validators.required),
      fonte: new FormControl(Validators.required),
      dificuldade: new FormControl('', Validators.required),
      assuntos: new FormControl([], Validators.required),
      assuntosInterdisciplinares: [],
      disciplinas: [],
      disciplinasInterdisciplinares: [],
      area: new FormControl(),
      alternativaCorreta: new FormControl(),
      alternativas: new FormControl(),
      areaInterdisciplinar: new FormControl(),
      status: new FormControl(),
    });
    this.criarQuestaoForm = this.fb.group({
      titulo: new FormControl('', Validators.required),
      corpo: new FormControl(),
      fonte: new FormControl(),
      dificuldade: new FormControl('', Validators.required),
      alternativas: new FormControl(),
      assuntos: [],
      assuntosInterdisciplinares: [],
      disciplinas: [],
      disciplinasInterdisciplinares: [],
      area: new FormControl(),
      areaInterdisciplinar: new FormControl(),
      alternativaCorreta: new FormControl(),
    });
  }

  ngOnInit() {
    this.idQuestao = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idQuestao) {
      this.btnCriarAtualizarEnviar = 'Atualizar';
      this.isCreate = false;
      this.questaoService.listById(this.idQuestao).subscribe(questaoRecebida => {
        this.questao = questaoRecebida;
        if (this.questao.alternativas && this.questao.alternativas.length > 0) {
          this.alternativas = this.questao.alternativas;
        }
        this.areaService.returnAllAreas().subscribe(areas => {
          this.areasRecebidas = areas.content;
          this.areasFiltroIntegracao = areas.content;
          const areaEncontrada = this.areasRecebidas.find(a => a.id === this.questao.area.id);
          this.atualizarQuestaoForm.patchValue({ area: areaEncontrada });
        });
        this.assuntoService.listarAssuntos().subscribe(assuntos => {
          this.assuntosInterdisciplinares = assuntos
          this.assuntosInterdisciplinares = this.assuntosInterdisciplinares.filter(
            (assunto: any) => assunto.id !== this.questao.assuntos?.[0]?.id
          );
        })
        this.areaService.listarPorId(this.questao.area.id).subscribe(area => {
          this.areaQuestao = area;
          this.loadFieldsArea(area);
          const areaEncontrada = this.areasRecebidas.find(a => a.id === this.questao.area.id);
          this.atualizarQuestaoForm.patchValue({ area: areaEncontrada });
          const disciplinaIds = this.questao.disciplinas.map(d => d.id);
          if (disciplinaIds.length > 0) {
            this.assuntoService.listarTodosPorDisciplinas(disciplinaIds).subscribe(assuntosRecebidos => {
              this.assuntos = assuntosRecebidos;
            });
          }
        });
        this.atualizarQuestaoForm.patchValue({
          titulo: this.questao.titulo,
          corpo: this.questao?.corpo,
          fonte: this.questao?.fonte,
          dificuldade: this.questao.dificuldade,
          area: this.questao.area,
          disciplinas: this.questao?.disciplinas[0] ?? null,
          assuntos: this.questao?.assuntos?.[0] ?? null,
          assuntosInterdisciplinares: this.questao?.assuntosInterdisciplinares?.map(a => a),
          alternativaCorreta: this.questao.alternativaCorreta,
          alternativas: this.questao.alternativas,
          status: this.questao.status,
        });
      });
    }else{
      this.areaService.returnAllAreas().subscribe(areas => {
        this.areasRecebidas = areas.content
        this.areasFiltroIntegracao = areas.content
      })
      this.assuntoService.listarAssuntos().subscribe(assuntosInterdisciplinares => {
        this.assuntosInterdisciplinares = assuntosInterdisciplinares
      })
      this.route.paramMap.subscribe(params => {
        const idArea = params.get('idArea')
        if (idArea) {
          this.btnCriarAtualizarEnviar = 'Enviar'
          const idParaNumber = +idArea
          this.areaService.listarPorId(idParaNumber).subscribe((area) => {
            this.criarQuestaoForm.patchValue({area: area});
          })
        }
      })
      this.alternativas = [
        {corpo: ' ', correta: false, posicao: 1},
        {corpo: ' ', correta: false, posicao: 2},
        {corpo: ' ', correta: false, posicao: 3},
        {corpo: ' ', correta: false, posicao: 4}
      ];
    }
  }


  toggleEditor(index: number) {
    this.expandedIndexes[index] = this.expandedIndexes[index];
  }

  submitAtualizarQuestao() {
    const formValue = this.atualizarQuestaoForm.value;

    formValue.corpo = this.atualizarQuestaoForm.value.corpo;
    formValue.alternativas = this.atualizarQuestaoForm.value.alternativas;
    formValue.id = this.idQuestao;
    formValue.area = this.atualizarQuestaoForm.value.area.id;
    this.atualizarQuestaoForm.value.disciplinas = Array(this.atualizarQuestaoForm.value.disciplinas)
    formValue.disciplinas = this.atualizarQuestaoForm.value.disciplinas.map((d: any)=> d.id);
    const assuntosValue = this.atualizarQuestaoForm.value?.assuntos;
    formValue.assuntos = Array.isArray(assuntosValue)
      ? assuntosValue.map((a: any) => a?.id)
      : [assuntosValue?.id];

    if(this.atualizarQuestaoForm.value.assuntosInterdisciplinares?.length > 0){
      formValue.assuntosInterdisciplinares = this.atualizarQuestaoForm.value.assuntosInterdisciplinares.map((a: any) => a.id);
    }

    formValue.disciplinas = this.atualizarQuestaoForm.value.disciplinas
    formValue.status = this.atualizarQuestaoForm.value.status

    this.questaoService.updateQuestion(formValue).subscribe({
      next: (value) => {
        this.toastService.success("Questao atualizada com sucesso!");
        this.router.navigate(['/minhas-questoes', value]);
      },
      error: (e) => {
        this.toastService.error("Erro ao atualizar o Questão!", e);
      }
    });
  }

  setCorreta(index: number) {
    this.alternativas.forEach((alternativa, i) => {
      alternativa.correta = i === index;
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

  previewQuestaoNoModelo() {
    this.pdfUrl = "";
    this.showPreview = true;
    this.carregamento = true;
    const formValue = {...this.atualizarQuestaoForm.value};

    formValue.corpo = this.atualizarQuestaoForm.value.corpo;
    formValue.area = this.atualizarQuestaoForm.value?.area?.id;
    const assuntosValue = this.atualizarQuestaoForm.value?.assuntos;
    formValue.assuntos = Array.isArray(assuntosValue)
      ? assuntosValue.map((a: any) => a?.id)
      : [assuntosValue?.id];

    const assuntosIValue = this.atualizarQuestaoForm.value?.assuntosInterdisciplinares;
    formValue.assuntosInterdisciplinares = Array.isArray(assuntosIValue)
      ? assuntosIValue.map((a: any) => a?.id)
      : [assuntosIValue?.id];

    formValue.alternativas = this.atualizarQuestaoForm.value.alternativas;
    const disciplinas = this.atualizarQuestaoForm.value?.disciplinas;
    formValue.disciplinas = Array.isArray(disciplinas)
      ? disciplinas.map((a: any) => a?.id)
      : [disciplinas?.id];

    this.relatoriosService.previewQuestao(formValue).pipe(
      timeout(20000),
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
        this.carregamento = false;

        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(fileURL);
        this.toastService.success("Preview gerado com sucesso!");
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
  validarAntesDeAvancar(nextCallback: any) {
    const formValue = this.atualizarQuestaoForm.value;

    const assuntosValidos = this.isValidValue(formValue.assuntos);
    const disciplinasValidas = this.isValidValue(formValue.disciplinas); // mesma lógica se necessário

    if (this.atualizarQuestaoForm.valid && assuntosValidos && disciplinasValidas) {
      nextCallback.emit();
    } else {
      this.toastService.error('Preencha todos os campos obrigatórios antes de avançar.');
    }
  }
  isValidValue(value: any): boolean {
    if (!value) return false;
    if (Array.isArray(value)) return value.length > 0 && !!value[0]?.nome;
    if (typeof value === 'object') return !!value.nome;
    return false;
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
    } else {
      nextCallback.emit();
    }
  }

  validarAcoes(nextCallback: any){
    this.validarAlternativasCorpo(nextCallback);
  }
  validarAlternativasCorpo(nextCallback: any) {

    const alternativasVazias = this.alternativas.some(alt => !alt.corpo.trim() || alt.corpo.trim() === "" || alt.corpo.trim() === " " || alt.corpo.trim() === "<br>");

    if (!alternativasVazias) {
      this.verMarcado(nextCallback);
    } else {
      this.toastService.error('Preencha todas as alternativas antes de avançar.');
    }
  }

  saveContent() {
    const content = this.previewContent;
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;
    document.body.appendChild(tempElement);
    html2canvas(tempElement).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF('p', 'mm', 'a4');
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('conteudo.pdf');
      document.body.removeChild(tempElement);
    });
  }
  loadFieldsDisciplinas(event: any) {
    const disciplinasSelecionadas = Array(event.value) || [];
    const form = this.isCreate ? this.criarQuestaoForm : this.atualizarQuestaoForm;
    if (disciplinasSelecionadas.length > 0) {
      const disciplinaIds = disciplinasSelecionadas.map((d: any) => d.id);

      this.assuntoService.listarTodosPorDisciplinas(disciplinaIds).subscribe(assuntosRecebidos => {
        const assuntosDaDisciplina = assuntosRecebidos;

        const assuntosSelecionados = this.questao?.assuntos || [];
        const selecionadosArray = Array.isArray(assuntosSelecionados)
          ? assuntosSelecionados
          : [assuntosSelecionados];

        const todosAssuntos = [
          ...assuntosDaDisciplina,
          ...selecionadosArray.filter(
            asel => !assuntosDaDisciplina.some(a => a.id === asel.id)
          )
        ];

        this.assuntos = todosAssuntos;

        const assuntosMatch = todosAssuntos.filter(a =>
          assuntosSelecionados.some(asel => asel.id === a.id)
        );

        form.patchValue({
          assuntos: assuntosMatch
        });
      });
    } else {
      this.assuntos = [];
      form.patchValue({
        assuntos: []
      });
    }
  }
    loadFieldsArea(event: any) {
      const selectedArea = event.value ? event.value : event;
      const form = this.isCreate ? this.criarQuestaoForm : this.atualizarQuestaoForm;
      const areaMudou = this.ultimaAreaSelecionada && this.ultimaAreaSelecionada.id !== selectedArea.id;

      if (areaMudou) {
        form.patchValue({
          disciplinas: [],
          assuntos: []
        });
        this.disciplinas = [];
        this.assuntos = [];
      }

      // Sempre atualiza a última área após verificar mudança
      this.ultimaAreaSelecionada = selectedArea;

      form.patchValue({ area: selectedArea });

      this.disciplinaService.listarDisciplinasPorArea(selectedArea.id).subscribe(disciplinasRecebidas => {
        const disciplinasDaArea = disciplinasRecebidas.content;

        const selecionadosArray = Array.isArray(disciplinasDaArea)
          ? disciplinasDaArea
          : (disciplinasDaArea ? [disciplinasDaArea] : []);

        // const disciplinasSelecionadas = this.atualizarQuestaoForm.get('disciplinas')?.value || [];

        const todasDisciplinas = [
          ...disciplinasDaArea,
          ...selecionadosArray.filter(
            (sel:any) => !disciplinasDaArea.some(d => d.id === sel.id)
          )
        ];

        this.disciplinas = todasDisciplinas;

        const disciplinasMatch = todasDisciplinas.filter(d =>
          selecionadosArray.some((ds:any) => ds.id === d.id)
        );

        form.patchValue({
          disciplinas: disciplinasMatch.length > 0 ? disciplinasMatch[0] : null
        });

        const disciplinaIds = disciplinasMatch.map((d: any) => d.id);

        if (disciplinaIds.length > 0) {
          this.assuntoService.listarTodosPorDisciplinas(disciplinaIds).subscribe(assuntosRecebidos => {
            const assuntosSelecionados = this.atualizarQuestaoForm.get('assuntos')?.value || [];

            const selecionadosArray = Array.isArray(assuntosSelecionados)
              ? assuntosSelecionados
              : (assuntosSelecionados ? [assuntosSelecionados] : []);

            const todosAssuntos = [
              ...assuntosRecebidos,
              ...selecionadosArray.filter(
                (asel:any) => !assuntosRecebidos.some(a => a.id === asel.id)
              )
            ];

            this.assuntos = todosAssuntos;

            const assuntosMatch = todosAssuntos.filter(a =>
              selecionadosArray.some((asel:any) => asel.id === a.id)
            );

            // this.atualizarQuestaoForm.patchValue({
            //   assuntos: assuntosMatch
            // });
            form.patchValue({
              assuntos: assuntosMatch.length > 0 ? assuntosMatch[0] : null
            });

          });
        } else {
          this.assuntos = [];
          form.patchValue({ assuntos: [] });
        }
      });
    }
  filterAssuntosInterdisciplinares(assuntoSelecionado: any) {
    this.assuntosInterdisciplinares = this.assuntosInterdisciplinares.filter(
      (assunto: any) => assunto.id !== assuntoSelecionado?.value?.id
    );
  }
  loadFieldsAreaIntegracao(event: any) {
    const selectedArea = event.value ? event.value : event;
    const form = this.isCreate ? this.criarQuestaoForm : this.atualizarQuestaoForm;
    const areaMudou = this.ultimaAreaSelecionadaInterdisciplinar && this.ultimaAreaSelecionadaInterdisciplinar.id !== selectedArea.id;

    if (areaMudou) {
      form.patchValue({
        disciplinasInterdisciplinares: [],
        assuntosInterdisciplinares: []
      });
      this.disciplinasFiltroIntegracao = [];
      this.assuntosInterdisciplinares = [];
    }

    this.ultimaAreaSelecionada = selectedArea;

    form.patchValue({areaInterdisciplinares: selectedArea});

    this.disciplinaService.listarDisciplinasPorArea(selectedArea.id).subscribe(disciplinasRecebidas => {
      const disciplinasDaArea = disciplinasRecebidas.content;

      const disciplinasSelecionadas = Array.isArray(disciplinasDaArea)
        ? disciplinasDaArea
        : (disciplinasDaArea ? [disciplinasDaArea] : []);

      const todasDisciplinas = [
        ...disciplinasDaArea,
        ...disciplinasSelecionadas.filter(
          (sel: any) => !disciplinasDaArea.some(d => d.id === sel.id)
        )
      ];

      this.disciplinasFiltroIntegracao = todasDisciplinas;

      const disciplinasMatch = todasDisciplinas.filter(d =>
        disciplinasSelecionadas.some((ds: any) => ds.id === d.id)
      );

      form.patchValue({
        disciplinasInterdisciplinares: disciplinasMatch
      });

      const disciplinaIds = disciplinasMatch.map((d: any) => d.id);

      if (disciplinaIds.length > 0) {
        this.assuntoService.listarTodosPorDisciplinas(disciplinaIds).subscribe(assuntosRecebidos => {
          const assuntosSelecionados = form.get('assuntosInterdisciplinares')?.value || [];

          const selecionadosArray = Array.isArray(assuntosSelecionados)
            ? assuntosSelecionados
            : [assuntosSelecionados];

          const todosAssuntos = [
            ...assuntosRecebidos,
            ...selecionadosArray.filter(
              (asel: any) => !assuntosRecebidos.some(a => a.id === asel.id)
            )
          ];

          this.assuntosInterdisciplinares = todosAssuntos;

          const assuntosMatch = todosAssuntos.filter(a =>
            assuntosSelecionados.some((asel: any) => asel.id === a.id)
          );

          form.patchValue({
            assuntosInterdisciplinares: assuntosMatch
          });
        });
      } else {
        this.assuntosInterdisciplinares = [];
        form.patchValue({assuntosInterdisciplinares: []});
      }
    });
  }
  loadFieldsDisciplinasIntegracao(event: any) {
    const disciplinasSelecionadas = Array(event.value) || [];
    const form = this.isCreate ? this.criarQuestaoForm : this.atualizarQuestaoForm;

    if (disciplinasSelecionadas.length > 0) {
      const disciplinaIds = disciplinasSelecionadas.map((d: any) => d.id);

      this.assuntoService.listarTodosPorDisciplinas(disciplinaIds).subscribe(assuntosRecebidos => {
        const assuntosDaDisciplina = assuntosRecebidos;

        const assuntosSelecionados = this.criarQuestaoForm.value?.assuntosInterdisciplinares || [];
        const todosAssuntos = [
          ...assuntosDaDisciplina,
          ...assuntosSelecionados.filter(
            (asel: any) => !assuntosDaDisciplina.some(a => a.id === asel.id)
          )
        ];

        this.assuntosInterdisciplinares = todosAssuntos;

        const assuntosMatch = todosAssuntos.filter(a =>
          assuntosSelecionados.some((asel: any) => asel.id === a.id)
        );

        form.patchValue({
          assuntosInterdisciplinares: assuntosMatch
        });
      });
    } else {
      this.assuntosInterdisciplinares = [];
      form.patchValue({
        assuntosInterdisciplinares: []
      });
    }
  }
  validarAntesDeAvancarInformacoes(nextCallback: any) {
    const form = this.isCreate ? this.criarQuestaoForm : this.atualizarQuestaoForm;
    const formValue = this.isCreate ? this.criarQuestaoForm.value : this.atualizarQuestaoForm.value;
    const assuntosValidos = this.isValidValue(formValue.assuntos);
    const disciplinasValidas = this.isValidValue(formValue.disciplinas); // mesma lógica se necessário
    if (form.valid && assuntosValidos && disciplinasValidas) {
      nextCallback.emit();
    } else {
      this.toastService.error('Preencha todos os campos obrigatórios antes de avançar.');
    }
  }

  validarAntesDeAvancarCorpo(nextCallback: any) {
    const form = this.isCreate ? this.criarQuestaoForm : this.atualizarQuestaoForm;
    const formValue = this.isCreate ? this.criarQuestaoForm.value : this.atualizarQuestaoForm.value;
    const parser = new DOMParser();
    const doc = parser.parseFromString(formValue.corpo, "text/html");/*interpreta o texto como html*/
    const corpoLimpo = doc.body.textContent?.trim() || "";/*se o doc tiver tags html, doc.body.textContent?.trim() || "" vai tirar as tags como <br> <p>
                                                                e o trim() remove os espaços*/

    if (corpoLimpo.length > 0) {
      nextCallback.emit();
    } else {
      this.toastService.error('Preencha o corpo antes de avançar.');
    }
  }
  sendForm(){
    if(this.isCreate){
      this.submitCriarQuestao()
    }else{
      this.submitAtualizarQuestao()
    }
  }
  submitCriarQuestao() {
    const formValue = this.criarQuestaoForm.value;

    formValue.corpo = this.corpo;
    formValue.alternativas = this.alternativas;
    // formValue.assuntos = this.criarQuestaoForm.value.assuntos.map((a: any) => a.id);
    const assuntosValue = this.criarQuestaoForm.value?.assuntos;
    formValue.assuntos = Array.isArray(assuntosValue)
      ? assuntosValue.map((a: any) => a?.id)
      : [assuntosValue?.id];

    if (this.criarQuestaoForm.value?.assuntosInterdisciplinares?.length > 0) {
      formValue.assuntosInterdisciplinares = this.criarQuestaoForm.value.assuntosInterdisciplinares.map((a: any) => a.id);
    }
    this.criarQuestaoForm.value.disciplinas = Array(this.criarQuestaoForm.value.disciplinas)
    formValue.disciplinas = this.criarQuestaoForm.value.disciplinas.map((d: any) => d.id);
    formValue.area = this.criarQuestaoForm.value.area?.id ?? this.criarQuestaoForm.value.area;
    formValue.alternativaCorreta = this.criarQuestaoForm.value?.alternativaCorreta?.id
    this.questaoService.createQuestion(formValue).subscribe({
      next: (value) => {
        const plainQuestion: PlainQuestion = {
          titulo: formValue.titulo,
          corpoPlano: this.getTextPlain(formValue.corpo),
          corpoMarkdown: this.getMarkdownFromHtml(formValue.corpo),
          fonteMarkdown: formValue?.fonte ? this.getMarkdownFromHtml(formValue.fonte) : null,
          fontePlana: formValue?.fonte ? this.getTextPlain(formValue.fonte) : null,
          alternativasPlanas: this.alternativas.map(a => ({
            corpoPlano: this.getTextPlain(a.corpo),
            corpoMarkdown: this.getMarkdownFromHtml(a.corpo)
          }))
        };
        this.questaoService.createPlainQuestion(plainQuestion).subscribe({
          next: () => {
            this.toastService.success("Questao plana criada com sucesso!");
          }
        });
        this.toastService.success("Questao criada com sucesso!");
        this.router.navigate(['/minhas-questoes', value]);
      },
      error: () => {
        this.toastService.error("Erro ao criar a questão!");
      }
    });
  }

  getTextPlain(html: string): string {
    let tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.innerText;
  }

  getMarkdownFromHtml(html: string): string {
    const turndownService = new TurndownService();
    return turndownService.turndown(html);
  }
}
