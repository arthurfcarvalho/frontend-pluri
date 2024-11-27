import { Component } from '@angular/core';
import { AccordionTabComponent } from "../accordion-tab/accordion-tab.component";
import { AccordionModule } from 'primeng/accordion';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [AccordionTabComponent, AccordionTabComponent, AccordionModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss'
})
export class AccordionComponent {

}
