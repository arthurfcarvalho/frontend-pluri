import { Component } from '@angular/core';
import { HeaderComponent } from '../../../home/components/header/header.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-turmas',
  standalone: true,
  imports: [
    HeaderComponent,
    TableModule,
    ButtonModule
  ],
  templateUrl: './search-turmas.component.html',
  styleUrl: './search-turmas.component.scss'
})
export class SearchTurmasComponent {
  turmas: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Dados ficticios para turmas
    this.turmas = [
      { codigo: '1TADM', nome: '1ª Turma de Administração', area: 'Administração', ano: 1 },
      { codigo: '2TINF', nome: '2ª Turma de Informática', area: 'Informática', ano: 2 },
      { codigo: '3TMEC', nome: '3ª Turma de Mecânica', area: 'Mecânica', ano: 3 },
      { codigo: '1TELE', nome: '1ª Turma de Eletrônica', area: 'Eletrônica', ano: 1 },
      { codigo: '2TAGR', nome: '2ª Turma de Agronomia', area: 'Agronomia', ano: 2 },
    ];
  }

  editTurma(turma: any): void {
    this.router.navigate(['/editar-turma', turma.codigo]);
  }

  deleteTurma(turma: any): void {
    // add delete turma
  }
}
