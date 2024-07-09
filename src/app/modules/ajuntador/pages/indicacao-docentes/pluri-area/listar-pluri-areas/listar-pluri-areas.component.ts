import { PluriArea } from './../../../../../../models/Pluri/PluriArea.model';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from '../../../../../home/components/header/header.component';
import { PluriService } from '../../../../../../services/pluri.service';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { Pluri } from '../../../../../../models/Pluri/Pluri.model';
import { UserService } from '../../../../../../services/user.service';
import { User } from '../../../../../../models/User.model';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-listar-pluri-areas',
  standalone: true,
  imports: [
    TableModule,
    HeaderComponent,
    ButtonModule,
    RouterModule,
    DatePipe,
    AccordionModule,
    AvatarModule,
    BadgeModule
  ],
  templateUrl: './listar-pluri-areas.component.html',
  styleUrl: './listar-pluri-areas.component.scss'
})
export class ListarPluriAreasComponent {

  dataPluri: Pluri[] = [];
  usuarioLogado: User = {
    id: 0,
    nome: '',
    login: '',
    data_nascimento: new Date,
    email: '',
    perfis: [],
    senha: ''
  }

  constructor(private pluriService: PluriService, private usuarioService: UserService) {}
  
  ngOnInit() {
    this.usuarioService.returnUserLogin().subscribe((login: any | null) => {
        this.usuarioService.returnUserByLogin(login.sub).subscribe(
          (user) => {
            this.usuarioLogado = user;
            console.log(this.usuarioLogado)
        })
    })
    this.getPluriAreas(this.usuarioLogado.id,0,10)
  }

  getPluriAreas(idUsuario: number, page: number, size: number) {
    this.pluriService.listPluriArea(idUsuario, page, size).subscribe(
      data => {
        this.dataPluri = data.content;
        console.log(data.content)
        console.log(this.dataPluri)
      },
      error => {
        console.error('Error fetching pluri areas', error);
      }
    );
  }
  onPageChange(event: LazyLoadEvent) {
    const first = event.first ?? 0;
    const rows = event.rows ?? 10;
    const page = first / rows;
    const size = rows;
    this.getPluriAreas(this.usuarioLogado.id, page, size);
  }

}
