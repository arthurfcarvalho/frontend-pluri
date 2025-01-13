import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { PluriService } from '../../../../services/pluri.service';
import { Pluri } from '../../../../models/Pluri/Pluri.model';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LazyLoadEvent } from 'primeng/api';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-search-pluri',
  standalone: true,
  imports: [
    TableModule,
    HeaderComponent,
    ButtonModule,
    RouterModule,
  ],
  providers: [DatePipe],
  templateUrl: './search-pluri.component.html',
  styleUrl: './search-pluri.component.scss'
})
export class SearchPluriComponent {

  dataPluri!: Pluri[];
  totalRecords = 0;

  constructor(private toastService: ToastrService,private pluriService: PluriService, public datePipe: DatePipe){
    this.loadPluris(0,10);
  }

  loadPluris(page: number = 0, size: number = 10){
    this.pluriService.searchUnfinishedPluris(page, size).subscribe((data) => {
      this.dataPluri = data.content;
      this.totalRecords = data.totalElements
    })
  }


  formatDate(date: Date){
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  formatTrimestre(trimestre: string){
    return `${trimestre}º Trimestre`;
  }

  /*onPageChange(event: LazyLoadEvent) {
    const first = event.first ?? 0;
    const rows = event.rows ?? 10;
    const page = first / rows;
    const size = rows;
    this.listPluris(page, size);
  }*/

  deletarPluri(id: number): void {
    this.pluriService.deletePluri(id).subscribe(
      () => {
        this.loadPluris(0, 10);
      },
      (error) => {
        const errorMessage = error.error.mensagem || 'Erro desconhecido ao excluir a questão';
        this.toastService.error(errorMessage);
      }
    );
  }
}
