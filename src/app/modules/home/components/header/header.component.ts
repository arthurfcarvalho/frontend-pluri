import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  items: any[];
  user: any;
  // objetos de teste, por ora!
  constructor() {

    this.items = [
      {
        label: 'Início',
        route: '/inicio',
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
            route: '/pesquisar',
            perm: 'PESQUISAR_PLURI'
          }
        ]
      }
    ];

    this.user = {
      name: 'Arthur Carvalho',
      perfis: [
        {
          name: 'Administrador do Sistema',
          permissoes: [
            {
              name: 'CRIAR_PLURI'
            },
             {
              name: 'PESQUISAR_PLURI'
            }
          ],
        },
        {
          name: 'Professor',
          permissoes: [
            {
              name: 'CRIAR_PLURI'
            }
          ]
        }
      ]
    };
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
    return this.user.perfis.some((perfil: any) => 
      perfil.permissoes && perfil.permissoes.some((p: any) => p.name === perm)
    );
  }
}
