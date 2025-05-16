import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { TokenService } from '../../../../services/token.service';
import { UserService } from '../../../../services/user.service';
import { QuestionService } from '../../../../services/question.service';
import { User } from '../../../../models/User.model';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { DadosQuestaoAEnviar } from '../../models/DadosQuestaoAEnviar.model';
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-listar-questao-a-enviar',
  standalone: true,
  imports: [
    TableModule,
    HeaderComponent,
    ButtonModule,
    RouterModule,
    DialogModule,
    FormsModule,
    TranslatePipe
  ],
  templateUrl: './listar-questao-a-enviar.component.html',
  styleUrls: ['./listar-questao-a-enviar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListarQuestaoAEnviarComponent implements AfterViewInit {

  mostrarDialog: boolean = false;
  dataQuestaoArea!: DadosQuestaoAEnviar[];
  idArea: number = 0;
  idQuestaoAEnviar: number = 0;
  user: User = {
    id: 0,
    login: ''
  };

  constructor(
    private questaoService: QuestionService,
    private userService: UserService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.userService.returnUserLogin().subscribe(
      (login: any | null) => {
        this.userService.returnUserByLogin(login.sub).subscribe(
          (user) => {
            this.user = user;
            this.questaoService.listQuestoesAEnviar(this.user.id).subscribe((data) => {
              this.dataQuestaoArea = data.content;
            });
          }
        );
      }
    );
  }

  abrirDialog(idArea: number, idQuestaoAEnviar: number) {
    this.idArea = idArea;
    this.idQuestaoAEnviar = idQuestaoAEnviar
    this.mostrarDialog = true;
  }
  fechar(){
    this.mostrarDialog = false
  }
  criarNovaQuestao() {
    this.mostrarDialog = false;
    this.router.navigate(['/criar-questao', this.idArea]);
  }
  enviarQuestaoExistente(){
    this.mostrarDialog = false;
    this.router.navigate(['/lista-questoes-para-envio', this.idQuestaoAEnviar]);

  }
}
