import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
@Component({
  selector: 'app-accordion-areas',
  standalone: true,
  imports: [
    AccordionModule
  ],
  templateUrl: './accordion-areas.component.html',
  styleUrl: './accordion-areas.component.scss'
})
export class AccordionAreasComponent {
  name: string = "Nome"

}
