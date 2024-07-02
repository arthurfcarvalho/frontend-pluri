import { Component } from '@angular/core';
import { TokenService } from '../../../../services/token.service';
import { UserService } from '../../../../services/user.service';
import { QuestionService } from '../../../../services/question.service';
import { Questao } from '../../models/Question.model';
import { User } from '../../../../models/User.model';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { TableModule } from 'primeng/table';
import { QuestaoArea } from '../../../../models/QuestaoArea.model';

@Component({
  selector: 'app-listar-questao-a-enviar',
  standalone: true,
  imports: [
    TableModule,
    HeaderComponent,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './listar-questao-a-enviar.component.html',
  styleUrl: './listar-questao-a-enviar.component.scss'
})
export class ListarQuestaoAEnviarComponent {

  dataQuestaoArea!: QuestaoArea[];
  id: number = 1;
  user: User =  {
    id: 0,
    login: ''
  }

  constructor(private questaoService: QuestionService, private userService: UserService, private tokenService: TokenService){ 
  }

  ngAfterViewInit(){
    this.userService.returnUserLogin().subscribe(
      (login: any | null) => {
        this.userService.returnUserByLogin(login.sub).subscribe(
          (user) => {
            this.user = user;
              this.questaoService.listQuestoesAEnviar(this.user.id).subscribe((data) => {
                console.log(data.content)
                this.dataQuestaoArea = data.content;
              })
        })
      })
    }

}
