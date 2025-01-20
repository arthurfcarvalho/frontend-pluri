import { TokenService } from './../../../../services/token.service';
import { AfterViewInit, Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { QuestionService } from '../../../../services/question.service';
import { Questao } from '../../models/Question.model';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/User.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ToastrService} from "ngx-toastr";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-lista-questoes-usuario',
  standalone: true,
  imports: [
    TableModule,
    HeaderComponent,
    ButtonModule,
    RouterModule,
    TranslatePipe,
  ],
  templateUrl: './lista-questoes-usuario.component.html',
  styleUrl: './lista-questoes-usuario.component.scss'
})
export class ListaQuestoesUsuarioComponent implements AfterViewInit{
  dataQuestao!: Questao[];
  id: number = 1;
  user: User =  {
    id: 0,
    login: ''
  }
  totalRecords = 0;

  constructor(
    private toastService: ToastrService,
    private snackBar: MatSnackBar, private questaoService: QuestionService, private userService: UserService, private tokenService: TokenService){
  }

  /*ngAfterViewInit(){
    this.userService.returnUserLogin().subscribe(
      (login: any | null) => {
        this.userService.returnUserByLogin(login.sub).subscribe(
          (user) => {
            this.user = user;
              this.questaoService.listQuestionsUser(this.user.id).subscribe((data) => {
                this.dataQuestao = data.content;
              })
        })
      })
    }*/
      ngAfterViewInit() {
        this.userService.returnUserLogin().subscribe(
          (login: any | null) => {
            this.userService.returnUserByLogin(login.sub).subscribe((user) => {
              this.user = user;
              this.loadQuestions(0, 10);
            });
          }
        );
      }

      loadQuestions(page: number = 0, size: number = 10) {
        this.questaoService.listQuestionsUser(this.user.id, page, size).subscribe((data) => {
          this.dataQuestao = data.content;
          this.totalRecords = data.totalElements;
        });
      }
    deletarQuestao(id: number): void {
        this.questaoService.deleteQuestao(id).subscribe(
          () => {
            this.loadQuestions(0, 10);
          },
          (error) => {
            const errorMessage = error.error.mensagem || 'Erro desconhecido ao excluir a questão';
            this.toastService.error(errorMessage);
          }
        );
    }
}

