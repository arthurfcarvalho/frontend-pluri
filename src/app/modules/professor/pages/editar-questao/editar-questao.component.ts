import { ToastrService } from 'ngx-toastr';
import { Questao } from './../../models/Question.model';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxSummernoteModule } from 'ngx-summernote';
import { StepperModule } from 'primeng/stepper';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { QuestionService } from '../../../../services/question.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DadosAtualizarQuestao } from '../../models/DadosAtualizarQuestao.model';
import Assunto from '../../../../models/Assunto.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { AssuntoService } from '../../../../services/assunto.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RelatoriosService } from '../../../../services/relatorios.service';
import { catchError, map, throwError, timeout } from 'rxjs';
import { ListboxModule } from 'primeng/listbox';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Alternativa } from '../../models/Alternativa.model';
import { Area } from '../../../../models/Area.model';
import { AreaService } from '../../../../services/area.service';


interface DynamicFields {
  corpo: string;
  alternativa1: string;
  alternativa2: string;
  alternativa3: string;
  alternativa4: string;
}

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
    InputIconModule
  ],
  templateUrl: './editar-questao.component.html',
  styleUrls: ['./editar-questao.component.scss']
})
export class EditarQuestaoComponent {

  idQuestao: number = 0;


  content = "Digite";
  titulo = 'Digite o titulo';
  corpo = " ";
  alternativa1!: Alternativa; 
  alternativa2!: Alternativa; 
  alternativa3!: Alternativa; 
  alternativa4!: Alternativa; 
  
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
  
  constructor(
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
      dificuldade: new FormControl('', Validators.required),
      alternativas: new FormControl('', Validators.required),
      codigo_assuntos: [[]],
      idArea: new FormControl()
    });
  }

  ngOnInit() {
    this.idQuestao = (Number(this.route.snapshot.paramMap.get('id')));
    if (this.idQuestao) {
      this.questaoService.listById(Number(this.idQuestao)).subscribe(questaoRecebida => {
        this.questao = questaoRecebida;

        this.corpo = this.questao.corpo;

        if (this.questao.alternativas && this.questao.alternativas.length > 0) {
          this.alternativa1 = this.questao.alternativas[0];  
          this.alternativa2 = this.questao.alternativas[1];  
          this.alternativa3 = this.questao.alternativas[2];  
          this.alternativa4 = this.questao.alternativas[3];  
        }

        this.assuntoService.listarAssuntos().subscribe(assuntosRecebidos => {
          this.assuntos = assuntosRecebidos.content;

          this.atualizarQuestaoForm.patchValue({
            ...this.questao,
            codigo_assuntos: this.questao.assuntos,
          });
          this.areaService.returnAllAreas().subscribe(areas => {
            this.areasRecebidas = areas.content
          })
          
          this.areaService.listarPorId(this.questao.idArea).subscribe((area)=>{
              this.areaQuestao = area
              this.atualizarQuestaoForm.patchValue({ idArea: area });
            })
          this.updatePreview();
        });  
      });
      
    }
  }

  
  

  submitAtualizarQuestao() {
    const formValue = this.atualizarQuestaoForm.value;

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
    .filter((codigo: any) => codigo !== null && codigo !== undefined && codigo !== 0 && codigo !== '');


    //formValue.codigo_assuntos = assuntosCodigosSelecionados;
    formValue.codigoAssuntos = assuntosCodigosSelecionados;
    formValue.id = this.idQuestao;

    console.log("Questão", formValue)
  
    this.questaoService.updateQuestion(formValue).subscribe({ 
        next: (value) => {
          this.toastService.success("Questao atualizada com sucesso!");
          this.router.navigate(['/', value]);
        },
        error: (e) => {
          this.toastService.error("Erro ao atualizar o Questão!");
        }
      });
    }

  
  public configPre: SummernoteOptions = {
    airMode: false,
    toolbar: [
      ['print', ['print']]
    ],
  };

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

  updatePreview() {
    //this.previewContent = this.getPreviewContent();
  }

  previewQuestaoNoModelo() {
    this.showPreview = true;
    this.carregamento = true;
    const formValue = this.atualizarQuestaoForm.value;

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


  saveContent() {
    const content = this.previewContent;

    console.log(content);

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
}
