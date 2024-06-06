import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/User.model';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';

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
  menuItems!: MenuItem[];
  user!: User;

  constructor(private userService: UserService) {
  }

  ngOnInit(){

    this.userService.returnUserLogin().subscribe(
      (login: any | null) => {
        this.userService.returnUserByLogin(login.sub).subscribe(
          (user) => {
            this.user = user;
            this.menuItems = [
              {
                label: 'Início',
                routerLink: '/home'
              },
              {
                label: 'Pluri',
                visible: this.userHasPermission(["CRIAR_PLURI", "PESQUISAR_PLURI"]),
                items: [
                  {
                    label: 'Criar Pluri',
                    routerLink: '/criar-pluri',
                    visible: this.userHasPermission(["CRIAR_PLURI"]),
                  },
                  {
                    label: 'Pesquisar Pluri',
                    routerLink: '/pesquisar-pluri',
                    visible: this.userHasPermission(["PESQUISAR_PLURI"])
                  },
                  {
                    label: 'Solicitar Questões'
                  }
                ]
              },
              {
                label: 'Administração',
                visible: this.userHasPermission(["PESQUISAR_ALUNOS"]),
                items: [
                  {
                    label: 'Usuários',
                    visible: this.userHasPermission(["PESQUISAR_ALUNOS"]),
                    items: [
                      {
                        label: 'Pesquisar Usuários',
                        visible: this.userHasPermission(["PESQUISAR_ALUNOS"]),
                        routerLink: '/pesquisar-usuarios'
                      }
                    ]
                  }
                ]
              },
            ]
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

    console.log(this.menuItems);
  }

  userHasPermission(requiredPermissions: string[]): boolean {

    return this.user.perfis.some((perfil) => {
      return perfil.permissoes && perfil.permissoes.some((perm) => requiredPermissions.includes(perm.codigo));
    })
  }
  
}
