import { Component } from '@angular/core';
import { AccordionAreasComponent } from "../../components/accordion-areas/accordion-areas.component";
import { HeaderComponent } from "../../home/components/header/header.component";

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [AccordionAreasComponent,
    HeaderComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent {
}
