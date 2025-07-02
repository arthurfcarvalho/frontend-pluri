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
import {ToastrService} from "ngx-toastr";
import {FormsModule} from "@angular/forms";
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-list-disciplinas',
  standalone: true,
  imports: [
    ButtonDirective,
    HeaderComponent,
    PrimeTemplate,
    RouterLink,
    TableModule,
    InputTextModule,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './list-disciplinas.component.html',
  styleUrl: './list-disciplinas.component.scss'
})
export class ListDisciplinasComponent {

  listDisciplinas: Assunto[] = [];
  totalRecords = 0;
  termoBusca: string = '';
  searchTimeout: any;
  pageSize = 10;
  sortField = 'nome';
  sortOrder = 1;

  constructor(private toastService: ToastrService, private disciplinaService: DisciplinaService) {
  }
  ngOnInit() {
    this.loadDisciplinas();
  }
  //busca reiniciando a página e usando os parametros atuais de ordenação e tamanho da página
  onSearchChange() {
    clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      const event = {
        first: 0,
        rows: this.pageSize,
        sortField: this.sortField,
        sortOrder: this.sortOrder
      };

      this.onLazyLoadWrapper(event);
    }, 400);
  }

  // função que trata o carregamento dos dados com base na paginação e ordenação recebidas
  onLazyLoadWrapper(event: any): void {
    const page = (event.first ?? 0) / (event.rows ?? 10);
    const size = event.rows ?? 10;

    const sortFieldRaw = event.sortField;
    const sortField = Array.isArray(sortFieldRaw)
      ? sortFieldRaw[0]
      : sortFieldRaw ?? 'nome';

    const sortOrder = event.sortOrder ?? 1;

    this.loadDisciplinas(page, size, sortField, sortOrder);
  }

  loadDisciplinas(page: number = 0, size: number = 10, sortField: string = 'nome', sortOrder: number = 1) {
    this.pageSize = size;
    this.sortField = sortField;
    this.sortOrder = sortOrder;

    const field = Array.isArray(sortField) ? sortField[0] : sortField;
    const direction = sortOrder === 1 ? 'asc' : 'desc';

    this.disciplinaService
      .listarDisciplinasPage(page, size, field, direction, this.termoBusca)
      .subscribe((data) => {
        this.listDisciplinas = data.content;
        this.totalRecords = data.totalElements;
      });
  }

  deletarDisciplina(id: number) {
    this.disciplinaService.deleteDisciplina(id).subscribe(
      () => {
        this.loadDisciplinas(0, 10);
      },
      (error) => {
        const errorMessage = error.error.mensagem || 'Erro desconhecido ao excluir a questão';
        this.toastService.error(errorMessage);
      }
    );
  }
}
