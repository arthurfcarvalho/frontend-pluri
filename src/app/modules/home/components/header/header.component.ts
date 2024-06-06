import { User } from './../../../../models/User.model';
import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MatMenuModule } from '@angular/material/menu';
import { UserService } from '../../../../services/user.service';
import { UserRoleBoxMessage } from '../../../../models/UserRoleBoxMensage.model';

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

export class HeaderComponent implements OnInit {
  items: any[];
  user =  {
    name: "",
    perfis: [{
      name: ""
    }]}
  teste: any
  login: any;
  listaPerfis = []


  // objetos de teste, por ora!
  constructor(
    private userService: UserService
  ) {

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
  }

  ngOnInit(): void {
    this.userService.returnUser().subscribe(
      (user: any | null) => {
        console.log(user);
        this.login = user.sub
      }
    )
    this.userService.returnUserRole(this.login).subscribe(
      (retorno)=>{
        console.log(retorno),
        this.teste = retorno
        console.log("Teste",this.teste)
        console.log("Teste",this.teste.perfis)
        const perfisNomes = this.teste.perfis.map((perfil: { nome: any; }) => perfil.nome);
        console.log("nomes",perfisNomes)
        this.listaPerfis = perfisNomes
        this.user = {
          name: this.teste.nome,
          perfis: perfisNomes
        };
        console.log(this.user)
      }
    )
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
