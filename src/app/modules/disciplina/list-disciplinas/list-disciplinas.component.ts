import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {HeaderComponent} from "../../home/components/header/header.component";
import {PrimeTemplate} from "primeng/api";
import {RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import {TranslatePipe} from "@ngx-translate/core";
import Assunto from "../../../models/Assunto.model";
import {AssuntoService} from "../../../services/assunto.service";
import {DisciplinaService} from "../../../services/disciplina.service";

@Component({
  selector: 'app-list-disciplinas',
  standalone: true,
    imports: [
        ButtonDirective,
        HeaderComponent,
        PrimeTemplate,
        RouterLink,
        TableModule,
        TranslatePipe
    ],
  templateUrl: './list-disciplinas.component.html',
  styleUrl: './list-disciplinas.component.scss'
})
export class ListDisciplinasComponent {

  listDisciplinas: Assunto[] = [];
  totalRecords = 0;


  constructor(private disciplinaService: DisciplinaService) {
  }
  ngOnInit() {
    this.loadDisciplinas();
  }

  loadDisciplinas(page: number = 0, size: number = 10) {
    this.disciplinaService.listarDisciplinasPage(page, size).subscribe((data) => {
      this.listDisciplinas = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  deletarDisciplina(id: number) {
  }
}
