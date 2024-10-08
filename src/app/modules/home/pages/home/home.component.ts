import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    AccordionModule,
    TabViewModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
