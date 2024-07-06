import { PluriArea } from './../../../../../../models/Pluri/PluriArea.model';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from '../../../../../home/components/header/header.component';
import { PluriService } from '../../../../../../services/pluri.service';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { Pluri } from '../../../../../../models/Pluri/Pluri.model';

@Component({
  selector: 'app-listar-pluri-areas',
  standalone: true,
  imports: [
    TableModule,
    HeaderComponent,
    ButtonModule,
    RouterModule,
    DatePipe,
    AccordionModule,
    AvatarModule,
    BadgeModule
  ],
  templateUrl: './listar-pluri-areas.component.html',
  styleUrl: './listar-pluri-areas.component.scss'
})
export class ListarPluriAreasComponent {

  dataPluri: Pluri[] = [];

  constructor(private pluriService: PluriService) {}
  
  ngOnInit() {
    this.getPluriAreas(1, 0, 10); // Exemplo: idUsuario=1, primeira página, 10 itens por página
  }

  getPluriAreas(idUsuario: number, page: number, size: number) {
    this.pluriService.listPluriArea(idUsuario, page, size).subscribe(
      data => {
        this.dataPluri = data.content;
        console.log(data.content)
        console.log(this.dataPluri)
        
      },
      error => {
        console.error('Error fetching pluri areas', error);
      }
    );
  }

}
