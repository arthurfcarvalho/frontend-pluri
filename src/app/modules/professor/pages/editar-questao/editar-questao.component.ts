import {ToastrService} from 'ngx-toastr';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {HeaderComponent} from '../../../home/components/header/header.component';
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {NgxSummernoteModule} from 'ngx-summernote';
import {StepperModule} from 'primeng/stepper';
import {CalendarModule} from 'primeng/calendar';
import {FloatLabelModule} from 'primeng/floatlabel';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {SummernoteOptions} from 'ngx-summernote/lib/summernote-options';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {QuestionService} from '../../../../services/question.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DadosAtualizarQuestao} from '../../models/DadosAtualizarQuestao.model';
import Assunto from '../../../../models/Assunto.model';
import {MultiSelectModule} from 'primeng/multiselect';
import {AssuntoService} from '../../../../services/assunto.service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {RelatoriosService} from '../../../../services/relatorios.service';
import {catchError, map, throwError, timeout} from 'rxjs';
import {ListboxModule} from 'primeng/listbox';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {IconFieldModule} from 'primeng/iconfield';
import {InputIconModule} from 'primeng/inputicon';
import {Alternativa} from '../../models/Alternativa.model';
import {Area} from '../../../../models/Area.model';
import {AreaService} from '../../../../services/area.service';
import {environment} from '../../../../../environments/environment';
import {CheckboxModule} from "primeng/checkbox";
import {InputSwitchModule} from "primeng/inputswitch";
import {DisciplinaService} from "../../../../services/disciplina.service";
import {Disciplina} from "../../../disciplina/models/disciplina";


@Component({
  selector: 'app-editar-questao',
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
    InputSwitchModule
  ],
  templateUrl: './editar-questao.component.html',
  styleUrls: ['./editar-questao.component.scss']
})
export class EditarQuestaoComponent implements  OnInit{

  idQuestao: number = 0;

  compararPorId = (a: any, b: any) => a && b && a.id === b.id;
  content = "Digite";
  titulo = 'Digite o titulo';
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

  constructor(
    private cdRef: ChangeDetectorRef,
    private disciplinaService: DisciplinaService,
    private areaService: AreaService,
    private relatoriosService: RelatoriosService,
    private fb: FormBuilder, private router: Router,
    private toastService: ToastrService,
    private assuntoService: AssuntoService,
    private dialog: MatDialog,
    private questaoService: QuestionService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute) {
    this.atualizarQuestaoForm = this.fb.group({
      titulo: new FormControl('', Validators.required),
      corpo: new FormControl('', Validators.required),
      fonte: new FormControl(Validators.required),
      dificuldade: new FormControl('', Validators.required),
      assuntos: [[]],
      disciplinas: [[]],
      area: new FormControl(),
      alternativaCorreta: new FormControl(),
      alternativas: new FormControl(),
    });
  }

  ngOnInit() {
    this.idQuestao = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idQuestao) {
      this.questaoService.listById(this.idQuestao).subscribe(questaoRecebida => {
        this.questao = questaoRecebida;
        if (this.questao.alternativas && this.questao.alternativas.length > 0) {
          this.alternativas = this.questao.alternativas;
        }
        this.areaService.returnAllAreas().subscribe(areas => {
          this.areasRecebidas = areas.content;
        });

        this.areaService.listarPorId(this.questao.area.id).subscribe(area => {
          this.areaQuestao = area;
          this.loadFieldsArea(area);
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
          disciplinas: this.questao.disciplinas.map(d => d),
          assuntos: this.questao.assuntos.map(a => a),
          alternativaCorreta: this.questao.alternativaCorreta,
          alternativas: this.questao.alternativas
        });
      });
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
    formValue.disciplinas = this.atualizarQuestaoForm.value.disciplinas.map((d: any)=> d.id);
    formValue.assuntos = this.atualizarQuestaoForm.value.assuntos.map((a: any)=> a.id);

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
    console.log(this.alternativas)
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

    formValue.assuntos = this.atualizarQuestaoForm.value.assuntos.map((a: any) => a.id);

    formValue.alternativas = this.atualizarQuestaoForm.value.alternativas;
    formValue.disciplinas = this.atualizarQuestaoForm.value.disciplinas.map((d: any) => d.id);

    this.relatoriosService.previewQuestao(formValue).pipe(
      timeout(3000),
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
    if (this.atualizarQuestaoForm.valid) {
      nextCallback.emit();
    } else {
      this.toastService.error('Preencha todos os campos obrigatórios antes de avançar.');
    }
  }

  verMarcado(nextCallback: any): void {
    let cont = 0;
    this.alternativas.forEach((alternativas, i) => {
      if (alternativas.correta === false) {
        cont = cont + 1;
      }
    });

    if (cont === 4) {
      this.toastService.error('Escolha uma questão correta.');
    }else{
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
  ultimaAreaSelecionada: any = null;
  selecoesPorArea: Map<number, { disciplinas: any[], assuntos: any[] }> = new Map();
  loadFieldsDisciplinas(event: any) {
    const disciplinasSelecionadas = event.value || [];

    if (disciplinasSelecionadas.length > 0) {
      const disciplinaIds = disciplinasSelecionadas.map((d: any) => d.id);

      this.assuntoService.listarTodosPorDisciplinas(disciplinaIds).subscribe(assuntosRecebidos => {
        const assuntosDaDisciplina = assuntosRecebidos;

        const assuntosSelecionados = this.questao?.assuntos || [];
        const todosAssuntos = [
          ...assuntosDaDisciplina,
          ...assuntosSelecionados.filter(
            asel => !assuntosDaDisciplina.some(a => a.id === asel.id)
          )
        ];

        this.assuntos = todosAssuntos;

        const assuntosMatch = todosAssuntos.filter(a =>
          assuntosSelecionados.some(asel => asel.id === a.id)
        );

        this.atualizarQuestaoForm.patchValue({
          assuntos: assuntosMatch
        });
      });
    } else {
      this.assuntos = [];
      this.atualizarQuestaoForm.patchValue({
        assuntos: []
      });
    }
  }
  loadFieldsArea(event: any) {
    const selectedArea = event.value ? event.value : event;

    const areaMudou = this.ultimaAreaSelecionada && this.ultimaAreaSelecionada.id !== selectedArea.id;

    if (areaMudou) {
      this.atualizarQuestaoForm.patchValue({
        disciplinas: [],
        assuntos: []
      });
      this.disciplinas = [];
      this.assuntos = [];
    }

    // Sempre atualiza a última área após verificar mudança
    this.ultimaAreaSelecionada = selectedArea;

    this.atualizarQuestaoForm.patchValue({ area: selectedArea });

    this.disciplinaService.listarDisciplinasPorArea(selectedArea.id).subscribe(disciplinasRecebidas => {
      const disciplinasDaArea = disciplinasRecebidas.content;

      const disciplinasSelecionadas = this.atualizarQuestaoForm.get('disciplinas')?.value || [];

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

      this.atualizarQuestaoForm.patchValue({
        disciplinas: disciplinasMatch
      });

      const disciplinaIds = disciplinasMatch.map((d: any) => d.id);

      if (disciplinaIds.length > 0) {
        this.assuntoService.listarTodosPorDisciplinas(disciplinaIds).subscribe(assuntosRecebidos => {
          const assuntosSelecionados = this.atualizarQuestaoForm.get('assuntos')?.value || [];

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

          this.atualizarQuestaoForm.patchValue({
            assuntos: assuntosMatch
          });
        });
      } else {
        this.assuntos = [];
        this.atualizarQuestaoForm.patchValue({ assuntos: [] });
      }
    });
  }
}
