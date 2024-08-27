import { Alternativa } from './../../models/Alternativa.model';
import { catchError, map, throwError, timeout } from 'rxjs';
import { AssuntoService } from './../../../../services/assunto.service';
import { QuestionService } from './../../../../services/question.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgxSummernoteModule } from 'ngx-summernote';

import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogQuestionComponent } from '../dialog-questao/dialog-questao.component';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Assunto from '../../../../models/Assunto.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { Area } from '../../../../models/Area.model';
import { ListboxModule } from 'primeng/listbox';
import { AreaService } from '../../../../services/area.service';
import { HttpClient } from '@angular/common/http';
import { RelatoriosService } from '../../../../services/relatorios.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { error } from 'jquery';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { CommonModule } from '@angular/common';


interface DynamicFields {
  titulo: string,
  corpo: string;
  alternativa1: any;
  alternativa2: any;
  alternativa3: any;
  alternativa4: any;
}

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
    InputIconModule
  ],
  templateUrl: './criar-questoes.component.html',
  styleUrls: ['./criar-questoes.component.scss']
})
export class CreateQuestionsComponent implements OnInit {


  content = "Digite";
  titulo = 'Digite o titulo';
  corpo = " ";
  alternativa1: Alternativa = {corpo: ' ', correta: false, posicao: 1};
  alternativa2: Alternativa = {corpo: ' ', correta: false, posicao: 2};
  alternativa3: Alternativa = {corpo: ' ', correta: false, posicao: 3};
  alternativa4: Alternativa = {corpo: ' ', correta: false, posicao: 4};
  dificuldades = ['Fácil', 'Médio', 'Difícil'];
  carregamento: boolean = false;
  pdfUrl: SafeResourceUrl | null = null;
  previewContent = '';
  assuntos!: Assunto[];
  areas!: Area[];
  criarQuestaoForm: FormGroup;
  areaSelecionada!: number;
  desabilitado = true;
  passou = false;
  showPreview = false;
  alternativas = [];
  
  
  @ViewChild('iframePDF', { static: false }) iframe!: ElementRef;



  active: number | undefined = 0;

  constructor(
    private relatoriosService: RelatoriosService,
    private http: HttpClient,
    private areaService: AreaService,
    private assuntoService: AssuntoService,
    private questaoService: QuestionService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private toastService: ToastrService,
    private router: Router
  ) {
    this.criarQuestaoForm = this.fb.group({
      titulo: new FormControl('', Validators.required),
      corpo: new FormControl('', Validators.required),
      dificuldade: new FormControl('', Validators.required),
      alternativas: new FormControl('', Validators.required),
      /*alternativa1: this.fb.group({
        corpo: new FormControl('', Validators.required),
        correta: new FormControl(false)
      }),
      alternativa2: this.fb.group({
        corpo: new FormControl('', Validators.required),
        correta: new FormControl(false)
      }),
      alternativa3: this.fb.group({
        corpo: new FormControl('', Validators.required),
        correta: new FormControl(false)
      }),
      alternativa4: this.fb.group({
        corpo: new FormControl('', Validators.required),
        correta: new FormControl(false)
      }),*/
      codigo_assuntos: [[]],
      id_area: ['']
    });

    this.assuntoService.listarAssuntos().subscribe(assuntosRecebidos => {
      this.assuntos = assuntosRecebidos.content;
    });

    this.areaService.returnAllAreas().subscribe(areaRecebidas => {
      this.areas = areaRecebidas.content;
    });
  }


  public config: SummernoteOptions = {
    airMode: false,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['fontname', ['fontname']],
      ['color', ['color']],
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
    uploadImagePath: "http://localhost:8080/controle-de-arquivos/enviar/",
    buttons: {}
    
  };

  ngOnInit(): void {
    this.updatePreview();
  }

  get f() {
    return this.criarQuestaoForm.controls;
  }

  onSubmit() {
    const formData = this.criarQuestaoForm.value;
    console.log(formData);
  }

  submitCriarQuestao() {
    const formValue = this.criarQuestaoForm.value;

    formValue.corpo = this.corpo;
    
    const alternativas = [
      this.alternativa1,
      this.alternativa2,
      this.alternativa3,
      this.alternativa4
    ];

    formValue.alternativas = alternativas;

    const assuntosCodigosSelecionados = formValue.codigo_assuntos
    .map((assunto: { codigo: string }) => assunto.codigo)
    .filter((codigo: any) => codigo !== null && codigo !== 0 && codigo !== '');

    formValue.codigo_assuntos = assuntosCodigosSelecionados;
    console.log("Questão", formValue)

    this.questaoService.createQuestion(formValue).subscribe({
      next: (value) => {
        this.toastService.success("Questao criada com sucesso!");
        this.router.navigate(['/', value]);
      },
      error: () => {
        this.toastService.error("Erro ao criar a questão!");
      }
    });
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
        <p><strong>1)</strong> ${alternativa1.texto || this.alternativa1.corpo}</p>
        <p><strong>2)</strong> ${alternativa2.corpo || this.alternativa2.corpo}</p>
        <p><strong>3)</strong> ${alternativa3.corpo || this.alternativa3.corpo}</p>
        <p><strong>4)</strong> ${alternativa4.corpo || this.alternativa4.corpo}</p>
      </div>
    `;
  }

  previewQuestaoNoModelo() {
    this.showPreview = true;
    this.carregamento = true;
    const formValue = this.criarQuestaoForm.value;

    const assuntosCodigosSelecionados = formValue.codigo_assuntos
    .map((assunto: { codigo: string }) => assunto.codigo)
    .filter((codigo: any) => codigo !== null && codigo !== undefined && codigo !== 0 && codigo !== '');

    formValue.codigo_assuntos = assuntosCodigosSelecionados;


    formValue.corpo = this.corpo;
    
    const alternativas = [
      this.alternativa1,
      this.alternativa2,
      this.alternativa3,
      this.alternativa4
    ];

    formValue.alternativas = alternativas;

    

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
}
