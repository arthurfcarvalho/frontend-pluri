import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Permission } from '../models/Permission.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermService {

  private readonly baseUrl = `${environment.apiUrl}/permissao/`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Retorna todas as permissões cadastradas.
   * @returns Observable contendo a lista de permissões.
   */
  returnAll(): Observable<Permission[]>{
    const url = this.baseUrl + 'listar-permissoes';
    return this.httpClient.get<Permission[]>(url).pipe(
      perms => perms
    )
  }
}
