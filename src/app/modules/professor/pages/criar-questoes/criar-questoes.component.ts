import { map } from 'rxjs';
import { AssuntoService } from './../../../../services/assunto.service';
import { QuestionService } from './../../../../services/question.service';
import { Component, OnInit } from '@angular/core';
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
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { error } from 'jquery';
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
    CommonModule
  ],
  templateUrl: './criar-questoes.component.html',
  styleUrls: ['./criar-questoes.component.scss']
})
export class CreateQuestionsComponent implements OnInit {

  content = "Digite";
  titulo = 'Digite o titulo';
  corpo = " ";
  alternativa1 = { texto: '', correta: false };
  alternativa2 = { texto: '', correta: false };
  alternativa3 = { texto: '', correta: false };
  alternativa4 = { texto: '', correta: false };
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

  constructor(
    private relatioriosService: RelatoriosService,
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
      alternativa1: this.fb.group({
        texto: new FormControl('', Validators.required),
        correta: new FormControl(false)
      }),
      alternativa2: this.fb.group({
        texto: new FormControl('', Validators.required),
        correta: new FormControl(false)
      }),
      alternativa3: this.fb.group({
        texto: new FormControl('', Validators.required),
        correta: new FormControl(false)
      }),
      alternativa4: this.fb.group({
        texto: new FormControl('', Validators.required),
        correta: new FormControl(false)
      }),
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
    const assuntosCodigosSelecionados = formValue.codigo_assuntos.map((assunto: any) => assunto.codigo);
    formValue.codigo_assuntos = assuntosCodigosSelecionados;

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
        <p><strong>1)</strong> ${alternativa1.texto || this.alternativa1.texto}</p>
        <p><strong>2)</strong> ${alternativa2.texto || this.alternativa2.texto}</p>
        <p><strong>3)</strong> ${alternativa3.texto || this.alternativa3.texto}</p>
        <p><strong>4)</strong> ${alternativa4.texto || this.alternativa4.texto}</p>
      </div>
    `;
  }

  openDialog(field: keyof DynamicFields): void {
    const fieldValue = this.criarQuestaoForm.get(field)?.value;
    const dialogRef = this.dialog.open(DialogQuestionComponent, {
      width: '60%',
      data: { 
        texto: fieldValue?.texto, 
        correta: fieldValue?.correta 
      }
    });

    dialogRef.componentInstance.saveEvent.subscribe((result: any) => {
      console.log(result);
      const { texto, correta } = result.content;
      this.criarQuestaoForm.get(field)?.patchValue({ texto, correta });
      this.updatePreview();
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const { texto, correta } = result.content;
        this.criarQuestaoForm.get(field)?.patchValue({ texto, correta });
        console.log(this.criarQuestaoForm.get(field)?.value);
        this.updatePreview();
      }
    });

  }

  previewQuestaoNoModelo() {
    this.showPreview = true;
    this.carregamento = true;
    const formValue = this.criarQuestaoForm.value;
    const assuntosCodigosSelecionados = formValue.codigo_assuntos.map((assunto: any) => assunto.codigo);
    formValue.codigo_assuntos = assuntosCodigosSelecionados;

    this.relatioriosService.previewQuestao(formValue).subscribe((pdfBlob: Blob) => {
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      this.carregamento = false;
    }, () => {
      this.carregamento = false;
    });
  }

  mouseEntrou() {
    this.passou = true;
  }

  mouseSaiu() {
    this.passou = false;
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
}
