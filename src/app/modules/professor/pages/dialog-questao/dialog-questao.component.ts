import { NgxSummernoteModule } from 'ngx-summernote';
import { Component, Inject } from '@angular/core';
import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import {DialogModule} from 'primeng/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Button } from 'primeng/button';

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
    
  ],
  templateUrl: './dialog-questao.component.html',
  styleUrl: './dialog-questao.component.scss'
})
export class DialogQuestionComponent {

  public config: SummernoteOptions = {
    airMode: false,
    toolbar: [
      ['style', ['style']],
      ['font', ['bold', 'italic', 'underline', 'clear']],
      ['fontname', ['fontname']],
      ['color', ['color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['table', ['table']],
      ['insert', ['link', 'picture', 'video']],
      ['view', ['fullscreen', 'codeview', 'help']]
    ],
    uploadImagePath: "http://localhost:8080/controle-de-arquivos/enviar/",
    buttons: {
      customButton: customButton
    }
  };

  base64ToBlob(base64: string, type: string): Blob {
    const binary = atob(base64);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type });
  }
  onDelete(file: any) {
    deleteResource(file.url);
  }
  
  enviarImagem(file: File) {
    
    console.log('Arquivo recebido:', file);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(',')[1]; // Extrai o base64 da imagem
      const formData = new FormData();
      formData.append('arquivo', file); // Adiciona o arquivo ao FormData

      this.http.post<any>('http://localhost:8080/controle-de-arquivos/enviar', formData).subscribe(
        (response) => {
          console.log('Upload bem-sucedido', response);
          const imageUrl = response.caminhoDoArquivo; // URL da imagem após upload
          // Agora você pode usar imageUrl conforme necessário (por exemplo, inserir na Summernote)
        },
        (error) => {
          console.error('Erro no upload', error);
        }
      );
    };
    reader.readAsDataURL(file);
  }


  

  constructor(
    public dialogRef: MatDialogRef<DialogQuestionComponent>,private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: { content: string }
  ) {}

  onSave(): void {
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

