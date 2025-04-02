import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import { Alternativa } from './../../models/Alternativa.model';
import { catchError, map, throwError, timeout } from 'rxjs';
import { AssuntoService } from './../../../../services/assunto.service';
import { QuestionService } from './../../../../services/question.service';
import { Component, ElementRef, OnInit, ViewChild, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { HttpClient } from '@angular/common/http';
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
    FormsModule
  ],
  templateUrl: './criar-questoes.component.html',
  styleUrls: ['./criar-questoes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush  // Habilita OnPush
})
export class CreateQuestionsComponent implements OnInit {
  content = "Digite";
  titulo = 'Digite o titulo';
  corpo = ' ';
  alternativas = [
    {corpo: '', correta: false, posicao: 1},
    {corpo: '', correta: false, posicao: 2},
    {corpo: '', correta: false, posicao: 3},
    {corpo: '', correta: false, posicao: 4}
  ];
  dificuldades = ['Fácil', 'Médio', 'Difícil'];
  carregamento: boolean = false;
  pdfUrl: SafeResourceUrl | null = null;
  previewContent = '';
  assuntos!: Assunto[];
  disciplinas: Disciplina[] = [];
  areas!: Area[];
  criarQuestaoForm: FormGroup;
  areaSelecionada!: number;
  areasRecebidas!: Area[]
  desabilitado = true;
  passou = false;
  showPreview = false;
  btnCriarEnviar = 'Criar';
  expandedIndexes: boolean[] = [true, true, true, true];
  @ViewChild('iframePDF', { static: false }) iframe!: ElementRef;
  active: number | undefined = 0;

  constructor(
    private relatoriosService: RelatoriosService,
    private http: HttpClient,
    private disciplinaService: DisciplinaService,
    private areaService: AreaService,
    private assuntoService: AssuntoService,
    private questaoService: QuestionService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.areaService.returnAllAreas().subscribe(areas => {
      this.areasRecebidas = areas.content
      console.log(this.areasRecebidas);
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
      titulo: new FormControl('', Validators.required),
      corpo: new FormControl(' ', Validators.required),
      dificuldade: new FormControl('', Validators.required),
      alternativas: new FormControl(' '),
      alternativa1: new FormControl(' '),
      alternativa2: new FormControl(' '),
      alternativa3: new FormControl(' '),
      alternativa4: new FormControl(' '),
      assuntos: [[]],
      disciplinas: [[]],
      area: new FormControl(),
      correta: new FormControl(),
    });
  }

  public config: SummernoteOptions = {
    airMode: false,
    toolbar: [
      // ['style', ['style']],
      // ['font', ['bold', 'italic', 'underline', 'clear']],
      // ['fontname', ['fontname']],
      // ['color', ['color']],
      // ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['picture', 'math']],
      ['custom', ['customButton']],
    ],
    lang: 'pt-BR',
    popover: {
      image: [
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']],
        ['custom', ['imageAttributes']],
      ]
    },
    //uploadImagePath: "http://200.131.116.21:8081/controle-de-arquivos/enviar/",
    uploadImagePath: `${environment.apiUrl}/controle-de-arquivos/enviar/`,
    buttons: {}
  };

  ngOnInit(): void {
    this.updatePreview();
  }

  get f() {
    return this.criarQuestaoForm.controls;
  }

  toggleEditor(index: number) {
    this.expandedIndexes[index] = this.expandedIndexes[index];
  }

  setCorreta(index: number) {
    this.alternativas.forEach((alternativa, i) => {
      if (i === index) {
        alternativa.correta = true;
      } else {
        alternativa.correta = false;
      }

    });

  }

  validarAcoes(nextCallback: any){
    this.validarAlternativasCorpo(nextCallback);
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

  onSubmit() {
    const formData = this.criarQuestaoForm.value;
    }

  validarAntesDeAvancar(nextCallback: any) {
    if (this.criarQuestaoForm.valid) {
      nextCallback.emit(); // Avança para a próxima etapa
    } else {
      this.toastService.error('Preencha todos os campos obrigatórios antes de avançar.');
    }
  }

  validarAntesDeAvancarCorpo(nextCallback: any) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(this.corpo , "text/html");/*interpreta o texto como html*/
    const corpoLimpo = doc.body.textContent?.trim() || "";/*se o doc tiver tags html, doc.body.textContent?.trim() || "" vai tirar as tags como <br> <p>
                                                                   e o trim() remove os espaços*/
    if (corpoLimpo.length > 0) {
      nextCallback.emit();
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
  existsAlternativaCorreta(){
      return this.alternativas.some((a) => a.correta === true);
  }

  public configPre: SummernoteOptions = {
    airMode: false,
    toolbar: [],
  };

  updatePreview() {
    this.previewContent = this.getPreviewContent();
  }

  getPreviewContent(): string {
    const { corpo, alternativa1, alternativa2, alternativa3, alternativa4 } = this.criarQuestaoForm.value;
    return `
      <div>
        <div>${corpo || this.corpo}</div><br>
        <p><strong>1)</strong> ${alternativa1.texto || this.alternativas[0].corpo}</p>
        <p><strong>2)</strong> ${alternativa2.corpo || this.alternativas[1].corpo}</p>
        <p><strong>3)</strong> ${alternativa3.corpo || this.alternativas[2].corpo}</p>
        <p><strong>4)</strong> ${alternativa4.corpo || this.alternativas[3].corpo}</p>
      </div>
    `;
  }

  previewQuestaoNoModelo() {
    this.pdfUrl = "";
    this.showPreview = true;
    this.carregamento = true;
    const formValue = { ...this.criarQuestaoForm.value };

    formValue.area = formValue.area.id;

    formValue.corpo = this.corpo;

    formValue.alternativas = this.alternativas;


    console.log(formValue)
    this.relatoriosService.previewQuestao(formValue).pipe(
      timeout(10000),
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

        this.carregamento = false;
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
    this.pdfUrl = null
  }

  mouseEntrou() {
    this.passou = true;
  }

  mouseSaiu() {
    this.passou = false;
  }

  loadFieldsArea(event: any) {
    this.criarQuestaoForm.patchValue({ area: event.value });
    this.disciplinaService.listarDisciplinasPorArea(event.value?.id).subscribe(disciplinasRecebidas => {
      this.disciplinas = disciplinasRecebidas.content;
    })
  }

  loadFieldsDisciplinas(event: any) {
    this.assuntoService.listarPorDisciplina(event.itemValue?.id).subscribe(assuntosRecebidos => {
      this.assuntos = assuntosRecebidos.content;
    })
  }
}
