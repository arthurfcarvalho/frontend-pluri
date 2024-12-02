import { ApiResponse } from './../../../types/api-response.type';
import { Component, OnInit } from '@angular/core';
import { AccordionAreasComponent } from "../../components/accordion-areas/accordion-areas.component";
import { HeaderComponent } from "../../home/components/header/header.component";
import { PluriService } from '../../../services/pluri.service';
import { ActivatedRoute } from '@angular/router';
import { PluriArea } from '../../../models/Pluri/PluriArea.model';
import { CommonModule } from '@angular/common';
import { DadosDetalhamentoAreaPluri } from '../../ajuntador/models/DadosDetalhamentoInformacoesGerais.mode';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    AccordionAreasComponent,
    CommonModule,
    HeaderComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit{

  idPluri!: number;

  pluriAreas!: DadosDetalhamentoAreaPluri[];

  constructor(private route: ActivatedRoute, private pluriService: PluriService){}
  
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      const idPluri = params.get('id')
      if(idPluri){
        const idParaNumber = +idPluri
        this.idPluri = idParaNumber
        this.pluriService.listarPluriAreasByPluri(idParaNumber, 0, 10).subscribe((apiresponse)=>{
          this.pluriAreas = apiresponse.content        
          //this.questaoService.listQuestoesIneditasUsuarioPorArea(this.idArea).subscribe(questoes=>{
            //this.questoesIneditas = questoes
          //})
        })
      }
      })
  }
}
