import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CarouselModule } from 'primeng/carousel';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CarouselModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  responsiveOptions: any[] | undefined;
}
