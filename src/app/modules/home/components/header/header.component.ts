import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { MessageModel } from '../../models/MessageModel';
import { PanelModule } from 'primeng/panel';
import { BadgeModule } from 'primeng/badge';
import {TranslateService} from "@ngx-translate/core";

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

  constructor(private translate: TranslateService,private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.returnUserLogin().subscribe((login: any | null) => {
      if(login){
        this.userService.returnUserByLogin(login?.sub).subscribe((user) => {
          this.user = user;
          this.userService.returnUserNotifications(user.id).subscribe((data) => {
            this.notifications = data;
          });
          this.translate.get([
            'MENU.HOME',
            'MENU.PLURI',
            'MENU.CREATE_PLURI',
            'MENU.SEARCH_PLURI',
            'MENU.ADMINISTRATION',
            'MENU.USERS',
            'MENU.CREATE_USER',
            'MENU.SEARCH_USERS',
            'MENU.PROFILES',
            'MENU.CREATE_PROFILE',
            'MENU.SEARCH_PROFILES',
            'MENU.AREAS',
            'MENU.CREATE_AREA',
            'MENU.SEARCH_AREAS',
            'MENU.TEACHER',
            'MENU.CREATE_SUBJECT',
            'MENU.SUBJECT',
            'MENU.CREATE_QUESTION',
            'MENU.MY_QUESTIONS',
            'MENU.QUESTIONS_TO_SEND',
            'MENU.ADJUSTER',
            'MENU.ASSIGN_DOCENT',
            'MENU.DESIGNER',
            'MENU.LIST_QUESTIONS',
            'MENU.CREATE_DISCIPLINE',
            'MENU.DISCIPLINE',
            'MENU.SEARCH_DISCIPLINE',
            'MENU.SEARCH_SUBJECT',
            'MENU.SEARCH_PLURI_OVERVIEW'
          ]).subscribe((translations) => {
            this.menuItems = [
              {
                label: translations['MENU.HOME'],
                routerLink: '/home'
              },
              {
                label: translations['MENU.PLURI'],
                visible: this.userHasPermission(["CRIAR_PLURI"]),
                items: [
                  {
                    label: translations['MENU.CREATE_PLURI'],
                    routerLink: '/criar-pluri',
                  },
                  {
                    label: translations['MENU.SEARCH_PLURI'],
                    routerLink: '/pesquisar-pluri',
                  },
                ]
              },
              {
                label: translations['MENU.ADMINISTRATION'],
                visible: this.userHasPermission(["CRIAR_PLURI"]),
                items: [
                  {
                    label: translations['MENU.USERS'],
                    visible: this.userHasPermission(["CRIAR_PLURI"]),
                    items: [
                      {
                        label: translations['MENU.CREATE_USER'],
                        routerLink: '/cadastrar'
                      },
                      {
                        label: translations['MENU.SEARCH_USERS'],
                        routerLink: '/pesquisar-usuarios'
                      }
                    ]
                  },
                  {
                    label: translations['MENU.PROFILES'],
                    visible: this.userHasPermission(["CRIAR_PLURI"]),
                    items: [
                      {
                        label: translations['MENU.CREATE_PROFILE'],
                        routerLink: '/criar-perfil'
                      },
                      {
                        label: translations['MENU.SEARCH_PROFILES'],
                        routerLink: '/pesquisar-perfis'
                      }
                    ]
                  },
                  {
                    label: translations['MENU.AREAS'],
                    visible: this.userHasPermission(["CRIAR_PLURI"]),
                    items: [
                      {
                        label: translations['MENU.CREATE_AREA'],
                        routerLink: '/criar-area'
                      },
                      {
                        label: translations['MENU.SEARCH_AREAS'],
                        routerLink: '/pesquisar-areas'
                      }
                    ]
                  },
                  {
                    label: translations['MENU.DISCIPLINE'],
                    visible: this.userHasPermission(["CRIAR_PLURI"]),
                    items: [
                      {
                        label: translations['MENU.CREATE_DISCIPLINE'],
                        routerLink: '/criar-disciplina'
                      },
                      {
                        label: translations['MENU.SEARCH_DISCIPLINE'],
                        routerLink: '/pesquisar-disciplinas'
                      }
                    ]
                  },
                  {
                    label: translations['MENU.SUBJECT'],
                    visible: this.userHasPermission(["CRIAR_PLURI"]),
                    items: [
                      {
                        label: translations['MENU.CREATE_SUBJECT'],
                        routerLink: '/criar-assunto'
                      },
                      {
                        label: translations['MENU.SEARCH_SUBJECT'],
                        routerLink: '/pesquisar-assuntos'
                      }
                    ]
                  },
                ]
              },
              {
                label: translations['MENU.TEACHER'],
                visible: this.userHasPermission(["CRIAR_QUESTAO"]),
                items: [
                  {
                    label: translations['MENU.CREATE_QUESTION'],
                    routerLink: '/criar-questao',
                  },
                  {
                    label: translations['MENU.MY_QUESTIONS'],
                    routerLink: '/minhas-questoes',
                  },
                  {
                    label: translations['MENU.QUESTIONS_TO_SEND'],
                    routerLink: '/questoes-a-enviar',
                  },
                ]
              },
              {
                label: translations['MENU.ADJUSTER'],
                visible: this.userHasPermission(["AJUNTAR_QUESTOES"]),
                items: [
                  {
                    label: translations['MENU.ASSIGN_DOCENT'],
                    routerLink: '/listar-pluri-areas',
                  },
                ]
              },
              {
                label: translations['MENU.DESIGNER'],
                visible: this.userHasPermission(["DIAGRAMADOR_QUESTOES"]),
                items: [
                  {
                    label: translations['MENU.LIST_QUESTIONS'],
                    routerLink: '/listar-questoes-aprovadas'
                  },
                  {
                    label: translations['MENU.SEARCH_PLURI_OVERVIEW'],
                    routerLink: '/listar-pluris-diagramador',
                  },
                ]
              }
            ];
          });
        });
      }
    });
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
    this.user = undefined;
    this.router.navigate(['/login']);
  }

  toggleNotifications(){
    this.showNotifications = !this.showNotifications;
  }

  protected readonly jQuery = jQuery;
}
