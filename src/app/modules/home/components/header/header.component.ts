import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/User.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    MatMenuModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  menuItems: any[];
  user!: User;

  constructor(private userService: UserService) {
    this.menuItems = [
      {
        label: 'Início',
        route: '/home',
      },
      {
        label: 'Pluri',
        items: [
          {
            label: 'Criar Pluri',
            route: '/criar-pluri',
            perm: 'CRIAR_PLURI'
          },
          {
            label: 'Pesquisar',
            route: '/pesquisar-pluri',
            perm: 'PESQUISAR_PLURI'
          }
        ]
      }
    ];
  }

  ngOnInit(){
    this.userService.returnUserLogin().subscribe(
      (login: any | null) => {
        this.userService.returnUserByLogin(login.sub).subscribe(
          (user) => {
            this.user = user;
          }
        )
      }
    )
  }

  ngAfterViewInit(){
    const userDiv = document.querySelector('.p-menubar-end') as HTMLElement;
    if(userDiv) {
      userDiv.style.marginLeft = 'auto';
    }
    const menubar = document.querySelector('.p-menubar') as HTMLElement;
    if(menubar){
      menubar.style.borderRadius = '0';
    }
  }

  userHasPermission(perm: string): boolean {
    return this.user.perfis.some((perfil) => 
      perfil.permissoes && perfil.permissoes.some((p) => p.nome === perm)
    );
  }
}
