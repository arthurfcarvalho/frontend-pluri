import { CardModule } from 'primeng/card';
import { DadosDetalhamentoPluri } from '../../models/DetailingPluriData.model';
import { PluriService } from '../../../../services/pluri.service';
import { AfterViewInit, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-list-pluri',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    RouterModule
  ],
  templateUrl: './list-pluri.component.html',
  styleUrl: './list-pluri.component.scss'
})
export class ListPluriComponent implements AfterViewInit{

  dados: DadosDetalhamentoPluri[] = [];
  


  constructor(private pluriService: PluriService){

  }
  ngAfterViewInit(): void {
      this.listarPlurisNaoRealizados();
  }

  listarPlurisNaoRealizados(){
    this.pluriService.listarPlurisNaoRealizados().subscribe((data) => {
      this.dados = data.content
      console.log(data)
    })
  }
  editar(){}
  finalizar(){}
}
