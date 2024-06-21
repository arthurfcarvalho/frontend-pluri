import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { QuestionService } from '../../../../services/question.service';
import { Questao } from '../../models/Question.model';

@Component({
  selector: 'app-lista-questoes-usuario',
  standalone: true,
  imports: [
    TableModule,
    HeaderComponent,
    ButtonModule,
    RouterModule,
    DatePipe
  ],
  templateUrl: './lista-questoes-usuario.component.html',
  styleUrl: './lista-questoes-usuario.component.scss'
})
export class ListaQuestoesUsuarioComponent {
  dataQuestao!: Questao[];
  id: number = 0;

  constructor(private questaoService: QuestionService, public datePipe: DatePipe){ 
    this.questaoService.listQuestionsUser(this.id).subscribe((data) => {
      this.dataQuestao = data.content;
    })
  }


}
