import { Component } from '@angular/core';
import {ButtonDirective} from "primeng/button";
import {HeaderComponent} from "../../home/components/header/header.component";
import {PrimeTemplate} from "primeng/api";
import {RouterLink} from "@angular/router";
import {TableModule} from "primeng/table";
import {TranslatePipe} from "@ngx-translate/core";
import Assunto from "../../../models/Assunto.model";
import {AssuntoService} from "../../../services/assunto.service";

@Component({
  selector: 'app-list-assuntos',
  standalone: true,
    imports: [
        ButtonDirective,
        HeaderComponent,
        PrimeTemplate,
        RouterLink,
        TableModule,
        TranslatePipe
    ],
  templateUrl: './list-assuntos.component.html',
  styleUrl: './list-assuntos.component.scss'
})
export class ListAssuntosComponent {
  listAssuntos: Assunto[] = [];
  totalRecords = 0;


  constructor(private assuntoService: AssuntoService) {
  }
  ngOnInit() {
    this.loadAssuntos();
  }

  loadAssuntos(page: number = 0, size: number = 10) {
    this.assuntoService.listAssuntosPage(page, size).subscribe((data) => {
      this.listAssuntos = data.content;
      this.totalRecords = data.totalElements;
    });
  }

  deletarAssunto(id: number) {
  }
}
