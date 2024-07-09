import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../models/Permission.model';

@Injectable({
  providedIn: 'root'
})
export class PermService {

  baseUrl = 'http://localhost:8080/permissao/';

  constructor(private httpClient: HttpClient) { }

  returnAll(): Observable<Permission[]>{
    const url = this.baseUrl + 'listar-permissoes';
    return this.httpClient.get<Permission[]>(url).pipe(
      perms => perms
    )
  }
}
