import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AccordionTabComponent } from "../../../shared/accordion-tab/accordion-tab.component";
import { AccordionComponent } from "../../../shared/accordion/accordion.component";

@Component({  
  selector: 'app-accordion-areas',
  standalone: true,
  imports: [AccordionModule, AccordionTabComponent, AccordionComponent],
  templateUrl: './accordion-areas.component.html',
  styleUrl: './accordion-areas.component.scss'
})
export class AccordionAreasComponent {
  header: string = "olá"

}
