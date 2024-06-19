import { NgxSummernoteModule } from 'ngx-summernote';
import { Component, Inject } from '@angular/core';
import { SummernoteOptions } from 'ngx-summernote/lib/summernote-options';
import {DialogModule} from 'primeng/dialog';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
export class DialogQuestionomponent {

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
  };
  

  constructor(
    public dialogRef: MatDialogRef<DialogQuestionomponent>,
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
