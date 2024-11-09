import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-denied-acess',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './denied-acess.component.html',
  styleUrl: './denied-acess.component.scss'
})
export class DeniedAcessComponent {

  constructor(private router: Router){

  }

  navigate(){
    this.router.navigate(['/login']);
  }

}
