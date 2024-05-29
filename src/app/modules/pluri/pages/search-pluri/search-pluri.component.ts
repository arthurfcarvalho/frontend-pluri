import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { PluriService } from '../../../../services/pluri.service';
import { Pluri } from '../../../../models/Pluri.model';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search-pluri',
  standalone: true,
  imports: [
    TableModule,
    HeaderComponent,
    ButtonModule,
    RouterModule,
    DatePipe
  ],
  providers: [DatePipe],
  templateUrl: './search-pluri.component.html',
  styleUrl: './search-pluri.component.scss'
})
export class SearchPluriComponent {

  dataPluri!: Pluri[];

  constructor(private pluriService: PluriService, public datePipe: DatePipe){ 
    this.pluriService.searchUnfinishedPluris().subscribe((data) => {
      this.dataPluri = data.content;
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
  
}
