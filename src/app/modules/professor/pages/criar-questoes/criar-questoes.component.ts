import { map } from 'rxjs';
import { AssuntoService } from './../../../../services/assunto.service';
import { QuestionService } from './../../../../services/question.service';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSummernoteModule } from 'ngx-summernote';

import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MatDialog } from '@angular/material/dialog';

import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogQuestionComponent } from '../dialog-questao/dialog-questao.component';
import { StepperModule } from 'primeng/stepper';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Assunto from '../../../../models/Assunto.model';
import { MultiSelectModule } from 'primeng/multiselect';
import { Area } from '../../../../models/Area.model';
import { ListboxModule } from 'primeng/listbox';
import { AreaService } from '../../../../services/area.service';
import { HttpClient } from '@angular/common/http';
import { RelatoriosService } from '../../../../services/relatorios.service';


interface DynamicFields {
  titulo: string,
  corpo: string;
  alternativa1: string;
  alternativa2: string;
  alternativa3: string;
  alternativa4: string;
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
    ListboxModule
  ],
  templateUrl: './criar-questoes.component.html',
  styleUrls: ['./criar-questoes.component.scss']
})
export class CreateQuestionsComponent implements OnInit, DynamicFields {


  content = "Digite";
  titulo =  'Digite o titulo';
  corpo = " ";
  alternativa1 = " ";
  alternativa2 = " ";
  alternativa3 = " ";
  alternativa4 = " ";

  previewContent = '';
  assuntos!: Assunto[];
  areas!: Area[];
  criarQuestaoForm: FormGroup;
  areaSelecionada!: number;


  ngOnInit(): void {
    this.updatePreview();
  }
  
  constructor(private relatioriosService: RelatoriosService,private http: HttpClient,private areaService: AreaService, private assuntoService: AssuntoService,private questaoService: QuestionService,private fb: FormBuilder, private sanitizer: DomSanitizer, private dialog: MatDialog,private toastService: ToastrService,
    private router: Router) {

    this.assuntoService.listarAssuntos().subscribe(assuntosRecebidos => {
      this.assuntos = assuntosRecebidos.content;
    })
    this.areaService.returnAllAreas().subscribe(areaRecebidas => {
      console.log(areaRecebidas.content)
      this.areas = areaRecebidas.content;
      console.log("areas", this.areas)
    })

    this.criarQuestaoForm = this.fb.group({
      titulo: new FormControl(''),
      corpo: new FormControl('', Validators.required),
      alternativa1: [''],
      alternativa2: new FormControl('', Validators.required),
      alternativa3: new FormControl('', Validators.required),
      alternativa4: new FormControl('', Validators.required),
      codigo_assuntos: [ []
        ],
      id_area: ['']
    });
  }

  get f() {
    return this.criarQuestaoForm.controls;
  }

  onSubmit() {
    const formData = this.criarQuestaoForm.value;
    console.log(formData);
  }

  submitCriarQuestao(){

    const formValue = this.criarQuestaoForm.value;

    console.log(formValue)
  
    
    const assuntosCodigosSelecionados = formValue.codigo_assuntos.map((assunto: any ) => assunto.codigo)
    
    formValue.codigo_assuntos = assuntosCodigosSelecionados
  
    this.questaoService.createQuestion(this.criarQuestaoForm.value).subscribe({ 
      next: (value) => {
        this.toastService.success("Questao criada com sucesso!");
        this.router.navigate(['/', value]);
      },
      error: (e) => {
        this.toastService.error("Erro ao criar o Questão!");
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
    popover: {
      table: [
        ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
        ['delete', ['deleteRow', 'deleteCol', 'deleteTable']]
      ],
      image: [
        ['image', ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone']],
        ['float', ['floatLeft', 'floatRight', 'floatNone']],
        ['remove', ['removeMedia']]
      ],
      link: [['link', ['linkDialogShow', 'unlink']]],
      air: [
        [
          'font',
          [
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'superscript',
            'subscript',
            'clear'
          ]
        ]
      ]
    },
    uploadImagePath: '/api/upload',
    toolbar: [
      ['misc', ['codeview', 'undo', 'redo', 'codeBlock']],
      [
        'font',
        [
          'bold',
          'italic',
          'underline',
          'strikethrough',
          'superscript',
          'subscript',
          'clear'
        ]
      ],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn']],
      ['view', ['fullscreen', 'codeview', 'help']],
      ['print', ['print']]
    ],
    fontNames: ['Arial'],
    buttons: {}
  };

  updatePreview() {
    this.previewContent = this.getPreviewContent();
  }

  getPreviewContent(): string {
    const { corpo, alternativa1, alternativa2, alternativa3, alternativa4 } = this.criarQuestaoForm.value;
    return `
      <div>
        <div>${corpo || this.corpo}</div><br>
        <p><strong>1)</strong> ${alternativa1 || this.alternativa1}</p>
        <p><strong>2)</strong> ${alternativa2 || this.alternativa2}</p>
        <p><strong>3)</strong> ${alternativa3 || this.alternativa3}</p>
        <p><strong>4)</strong> ${alternativa4 || this.alternativa4}</p>
      </div>
    `;
  }

  htmlContentSend(texto: string) {
    console.log(texto);
  }

  openDialog(field: keyof DynamicFields): void {
    const dialogRef = this.dialog.open(DialogQuestionComponent, {
      width: '60%',
      data: { content: this[field] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this[field] = result.content;
        this.criarQuestaoForm.controls[field].setValue(result.content);
        this.updatePreview();
      }
    });
  }

  previewQuestaoNoModelo(){
    const formValue = this.criarQuestaoForm.value;

    console.log(formValue)
  
    
    const assuntosCodigosSelecionados = formValue.codigo_assuntos.map((assunto: any ) => assunto.codigo)
    
    formValue.codigo_assuntos = assuntosCodigosSelecionados

    this.relatioriosService.previewQuestao(formValue).subscribe((pdfBlob: Blob)=>{
      
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      window.open(blobUrl);
    })
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
      doc.save('conteudo.pdf');document.body.removeChild(tempElement);
    });
    
  }
}
