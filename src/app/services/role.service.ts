import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Role } from '../models/Role.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private readonly baseUrl = `${environment.apiUrl}/perfil/`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Cria um novo perfil.
   * @param data Dados do novo perfil.
   * @returns Observable com a resposta do backend.
   */
  create(data: any){
    const url = this.baseUrl + 'criar-perfil-permissao';
    return this.httpClient.post(url, data);
  }

  /**
   * Retorna todos os perfis cadastrados.
   * @returns Observable contendo a lista de roles.
   */
  returnAllRoles(): Observable<Role[]>{
    const url = this.baseUrl + 'listar-perfis';
    return this.httpClient.get<Role[]>(url).pipe(
      roles => roles
    )
  }

  getById(id: number): Observable<Role> {
    const url = `${this.baseUrl}buscar-perfil/${id}`;
    return this.httpClient.get<Role>(url);
  }

  /**
   * Atribui permissões a um perfil existente.
   * @param id ID do perfil (role).
   * @param perms Lista de permissões a serem atribuídas ao perfil.
   * @returns Observable com a resposta do backend.
   */
  saveRoles(id: number, perms: any){
    const url = this.baseUrl + 'dar-permissoes';
    const data = {id: id, permissoes: perms};
    return this.httpClient.put(url, data).pipe(
      map((response: any) => response)
    )
  }
}
