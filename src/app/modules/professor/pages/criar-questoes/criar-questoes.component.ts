import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { DomSanitizer } from '@angular/platform-browser';
import {NgxSummernoteModule} from 'ngx-summernote';

import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MatDialog } from '@angular/material/dialog';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogQuestionomponent } from '../dialog-questao/dialog-questao.component';

interface DynamicFields {
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
  ],
  templateUrl: './criar-questoes.component.html',
  styleUrl: './criar-questoes.component.scss'
})

export class CreateQuestionsComponent implements OnInit, DynamicFields {
  
  ngOnInit(): void {
      
  }

  constructor(private sanitizer: DomSanitizer, private dialog: MatDialog){}

  public form: FormGroup = new FormGroup({
    html: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  content = "Digite";
  corpo = "Digite o corpo";
  alternativa1 = "Digite o conteúdo";
  alternativa2 = "Digite o conteúdo";
  alternativa3 = "Digite o conteúdo";
  alternativa4 = "Digite o conteúdo";


  previewContent = ` 
    <div>
      <div>${this.corpo}</div><br>
      <p><strong>1)</strong> ${this.alternativa1}</p>
      <p><strong>2)</strong> ${this.alternativa2}</p>
      <p><strong>3)</strong> ${this.alternativa3}</p>
      <p><strong>4)</strong> ${this.alternativa4}</p>
    </div>`;


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
      buttons: { }
    };

    updatePreview(){
      console.log(this.previewContent)
      this.previewContent = this.getPreviewContent();
      console.log(this.previewContent)
    }

    getPreviewContent(): string {
      return `
        <div>
          <div>${this.corpo}</div><br>
          <p><strong>1)</strong> ${this.alternativa1}</p>
          <p><strong>2)</strong> ${this.alternativa2}</p>
          <p><strong>3)</strong> ${this.alternativa3}</p>
          <p><strong>4)</strong> ${this.alternativa4}</p>
        </div>
      `;
    }
    htmlContentSend(texto: string) {
      console.log(texto);
    }

    openDialog(field: keyof DynamicFields): void {
      
      const dialogRef = this.dialog.open(DialogQuestionomponent, {
        width: '80%',
        data: { content: this[field] }
      });
    
      dialogRef.afterClosed().subscribe(result => {
        if (result) {

          this[field] = result.content;
          this.updatePreview()
        }
      });
    }

  saveContent() {
    const content = `
      <div>
        <div>${this.corpo}</div>
        <br>
        <span>(1) ${this.alternativa1}</span><br>
        <span>(2) ${this.alternativa2}</span><br>
        <span>(3) ${this.alternativa3}</span><br>
        <span>(4) ${this.alternativa4}</span><br>
      </div>
    `;


  

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
