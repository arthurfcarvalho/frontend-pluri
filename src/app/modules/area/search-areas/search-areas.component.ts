import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../home/components/header/header.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AreaService } from '../../../services/area.service';

@Component({
  selector: 'app-search-areas',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonModule,
    TableModule
  ],
  templateUrl: './search-areas.component.html',
  styleUrl: './search-areas.component.scss'
})
export class SearchAreasComponent implements OnInit{
  areas!: any[];

  constructor(
    private areaService: AreaService
  ){
    
  }

  ngOnInit(): void {
    this.areaService.returnAllAreas().subscribe(areas => {
      this.areas = areas.content;
    })
  }

}
