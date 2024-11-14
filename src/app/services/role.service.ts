import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from '../models/Role.model';
import { Permission } from '../models/Permission.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = environment.apiUrl + '/perfil/';

  constructor(private httpClient: HttpClient) { }

  create(data: any){
    const url = this.baseUrl + 'criar-perfil-permissao';
    return this.httpClient.post(url, data);
  }

  returnAllRoles(): Observable<Role[]>{
    const url = this.baseUrl + 'listar-perfis';
    return this.httpClient.get<Role[]>(url).pipe(
      roles => roles
    )
  }

  saveRoles(id: number, perms: any){
    const url = this.baseUrl + 'dar-permissoes';
    const data = {id: id, permissoes: perms};
    return this.httpClient.put(url, data).pipe(
      map((response: any) => response)
    )
  }
}
