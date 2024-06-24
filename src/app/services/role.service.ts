import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Role } from '../models/Role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  baseUrl = 'http://localhost:8080/perfil/';

  constructor(private httpClient: HttpClient) { }

  returnAllRoles(): Observable<Role[]>{
    const url = this.baseUrl + 'listar-perfis';
    return this.httpClient.get<Role[]>(url).pipe(
      roles => roles
    )
  }
}
