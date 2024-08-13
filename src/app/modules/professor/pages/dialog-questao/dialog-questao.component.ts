import { NgxSummernoteModule } from 'ngx-summernote';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import {DialogModule} from 'primeng/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
declare var $: any;


function customButton(context: any) {
  const ui = $.summernote.ui;
  const button = ui.button({
    contents: '<i class="note-icon-magic"></i> Hello',
    tooltip: 'Custom button',
    container: '.note-editor',
    className: 'note-btn',
    click: function() {
      context.invoke('editor.insertText', 'Hello from test btn!!!');
    }
  });
  return button.render();
}

@Component({
  selector: 'app-dialog-questao',
  standalone: true,
  imports: [
    NgxSummernoteModule,
    DialogModule,
    ButtonModule,
    CardModule,
    CommonModule,
    FormsModule,
    CheckboxModule
  ],
  templateUrl: './dialog-questao.component.html',
  styleUrl: './dialog-questao.component.scss'
})
export class DialogQuestionComponent {
  @Output() saveEvent = new EventEmitter<any>();

  public config: SummernoteOptions = {
    airMode: false,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['fontname', ['fontname']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['picture', 'math']],
      ['view', ['fullscreen', 'codeview']],
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

  onDelete(file: any) {
    deleteResource(file.url);
  }
  
  constructor(
    public dialogRef: MatDialogRef<DialogQuestionComponent>,private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSave(): void {
    this.saveEvent.emit(this.data);
    this.dialogRef.close(this.data);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
function deleteResource(url: any) {
  throw new Error('Function not implemented.');
}

