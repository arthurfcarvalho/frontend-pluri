import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../models/Permission.model';
import { URLS } from '../../assets/constantes';

@Injectable({
  providedIn: 'root'
})
export class PermService {

  baseUrl = `${URLS.IP_LOCAL}/permissao/`;

  constructor(private httpClient: HttpClient) { }

  returnAll(): Observable<Permission[]>{
    const url = this.baseUrl + 'listar-permissoes';
    return this.httpClient.get<Permission[]>(url).pipe(
      perms => perms
    )
  }
}
