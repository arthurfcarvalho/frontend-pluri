import { ToastrService } from 'ngx-toastr';
import { Questao } from './../../models/Question.model';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { Form, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogQuestionComponent } from '../dialog-questao/dialog-questao.component';
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
    MultiSelectModule
  ],
  templateUrl: './editar-questao.component.html',
  styleUrls: ['./editar-questao.component.scss']
})
export class EditarQuestaoComponent {

  atualizarQuestaoForm: FormGroup;
  questao!: DadosAtualizarQuestao;
  previewContent = '';
  assuntos!: Assunto[];
  
  constructor(private router: Router, private toastService: ToastrService,private assuntoService: AssuntoService,private dialog: MatDialog, private questaoService: QuestionService, private route: ActivatedRoute) {
    this.atualizarQuestaoForm = new FormGroup({
      id: new FormControl(),
      titulo: new FormControl(),
      dificuldade: new FormControl(),
      area_nome: new FormControl(),
      corpo: new FormControl(),
      alternativa1: new FormControl(),
      alternativa2: new FormControl(),
      alternativa3: new FormControl(),
      alternativa4: new FormControl(),
      codigo_assuntos: new FormControl()
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.questaoService.listById(Number(id)).subscribe(questaoRecebida => {
        this.questao = questaoRecebida;

        this.assuntoService.listarAssuntos().subscribe(assuntosRecebidos => {
          this.assuntos = assuntosRecebidos.content;

          this.atualizarQuestaoForm.patchValue({
            ...this.questao,
            codigo_assuntos: this.questao.assuntos,
          });
          this.updatePreview();
        });  
      });
    }
  }

  
  

  submitAtualizarQuestao() {
    if (this.atualizarQuestaoForm.valid) {

      const questaoAtualizada = this.atualizarQuestaoForm.value;
      
      const assuntosCodigosSelecionados = this.atualizarQuestaoForm.value.codigo_assuntos.map((assunto: any ) => assunto.codigo)

      questaoAtualizada.codigo_assuntos = assuntosCodigosSelecionados

      this.questaoService.updateQuestion(questaoAtualizada).subscribe({ 
        next: (value) => {
          this.toastService.success("Questao criada com sucesso!");
          this.router.navigate(['/', value]);
        },
        error: (e) => {
          this.toastService.error("Erro ao criar o Questão!");
        }
      });
    }
  }

  openDialog(field: keyof DynamicFields): void {
    const dialogRef = this.dialog.open(DialogQuestionComponent, {
      width: '80%',
      data: { content: this.questao[field] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.atualizarQuestaoForm.controls[field].setValue(result.content);
        this.updatePreview();
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
      ['insert', ['table', 'picture', 'link', 'video', 'hr']],
      ['customButtons', ['testBtn']],
      ['view', ['fullscreen', 'codeview', 'help']],
      ['print', ['print']]
    ],
    fontNames: ['Arial', 'Times New Roman', 'Inter', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times', 'MangCau', 'BayBuomHep', 'BaiSau', 'BaiHoc', 'CoDien', 'BucThu', 'KeChuyen', 'MayChu', 'ThoiDai', 'ThuPhap-Ivy', 'ThuPhap-ThienAn'],
    buttons: {}
  };

  getPreviewContent(): string {
    const { corpo, alternativa1, alternativa2, alternativa3, alternativa4 } = this.atualizarQuestaoForm.value;
    return `
      <div>
        <div>${corpo || this.questao.corpo}</div><br>
        <p><strong>1)</strong> ${alternativa1 || this.questao.alternativa1}</p>
        <p><strong>2)</strong> ${alternativa2 || this.questao.alternativa2}</p>
        <p><strong>3)</strong> ${alternativa3 || this.questao.alternativa3}</p>
        <p><strong>4)</strong> ${alternativa4 || this.questao.alternativa4}</p>
      </div>
    `;
  }

  updatePreview() {
    this.previewContent = this.getPreviewContent();
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
