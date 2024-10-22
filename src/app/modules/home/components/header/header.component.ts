import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/User.model';
import { CommonModule } from '@angular/common';
import { MenuItem, Message } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageModel } from '../../models/MessageModel';
import { PanelModule } from 'primeng/panel';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MenubarModule,
    MatMenuModule,
    CommonModule,
    PanelModule,
    BadgeModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  menuItems!: MenuItem[];
  user: any;
  notifications: MessageModel[] = [];
  showNotifications: boolean = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(){

    this.userService.returnUserLogin().subscribe(
      (login: any | null) => {
        this.userService.returnUserByLogin(login.sub).subscribe(

          (user) => {
             
            this.user = user;

            this.userService.returnUserNotifications(user.id).subscribe(data=> {
              this.notifications = data;
            });
            
                     
            this.menuItems = [
              {
                label: 'Início',
                routerLink: '/home'
              },
              {
                label: 'Pluri',
                visible: this.userHasPermission(["CRIAR_PLURI"]),
                items: [
                  {
                    label: 'Criar Pluri',
                    routerLink: '/criar-pluri',
                    //visible: this.userHasPermission(["CRIAR_PLURI"]),
                  },
                  {
                    label: 'Pesquisar Pluri',
                    routerLink: '/pesquisar-pluri',
                    //visible: this.userHasPermission(["CRIAR_PLURI"])
                  },
                ]
              },
              {
                label: 'Administração',
                visible: this.userHasPermission(["CRIAR_PLURI"]),
                items: [
                  {
                    label: 'Usuários',
                    visible: this.userHasPermission(["CRIAR_PLURI"]),
                    items: [
                      {
                        label: 'Pesquisar Usuários',
                        //visible: this.userHasPermission(["CRIAR_PLURI"]),
                        routerLink: '/pesquisar-usuarios'
                      }
                    ]
                  },
                  {
                    label: 'Perfis',
                    visible: this.userHasPermission(["CRIAR_PLURI"]),
                    items: [
                      {
                        label: 'Criar Perfil',
                        //visible: this.userHasPermission(["CRIAR_PLURI"]),
                        routerLink: '/criar-perfil'
                      },
                      {
                        label: 'Pesquisar Perfis',
                        //visible: this.userHasPermission(["CRIAR_PLURI"]),
                        routerLink: '/pesquisar-perfis'
                      }
                    ]
                  },
                  {
                    label: 'Áreas',
                    visible: this.userHasPermission(["CRIAR_PLURI"]),
                    items: [
                      {
                        label: 'Criar Área',
                        //visible: this.userHasPermission(["CRIAR_PERFIL"]),
                        routerLink: '/criar-area'
                      },
                      {
                        label: 'Pesquisar Áreas',
                        //visible: this.userHasPermission(["CRIAR_PLURI"]),
                        routerLink: '/pesquisar-areas'
                      }
                    ]
                  }
                ]
              },
              {
                label: 'Professor',
                visible: this.userHasPermission(["CRIAR_QUESTAO"]),
                items: [
                  {
                    label: 'Criar Questão',
                    routerLink: '/criar-questao',
                    //visible: this.userHasPermission(["CRIAR_QUESTAO"])
                  },
                  {
                    label: 'Minhas Questões',
                    routerLink: '/minhas-questoes',
                    //visible: this.userHasPermission(["CRIAR_QUESTAO"])
                  },
                  {
                    label: 'Questoes a Enviar',
                    routerLink: '/questoes-a-enviar',
                    //visible: this.userHasPermission(["CRIAR_QUESTAO"])
                  },
                ]
              },
              {
                label: 'Ajuntador',
                visible: this.userHasPermission(["CRIAR_QUESTAO"]),
                items: [
                  {
                    label: 'Indicar Docente para pluri Area',
                    routerLink: '/listar-pluri-areas',
                    //visible: this.userHasPermission(["CRIAR_QUESTAO"])
                  },
                ]
              },
              {
                label: 'Diagramador',
                items: [
                  {
                    label: 'Listar Questoes',
                    routerLink: '/listar-questoes-aprovadas'
                  }
                ]

              }
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
  }

  userHasPermission(requiredPermissions: string[]): boolean {

    return this.user.dadosPerfil.some((perfil: any) => {
      return perfil.permissoes && perfil.permissoes.some((perm: any) => requiredPermissions.includes(perm.codigo));
    })
  }

  logout(){
    this.userService.logout();
    this.router.navigate(['/login']);
  }
  
  toggleNotifications(){
    this.showNotifications = !this.showNotifications;
  }
}
