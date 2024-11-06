import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Permission } from '../models/Permission.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PermService {

  baseUrl = environment.apiUrl + '/permissao/';

  constructor(private httpClient: HttpClient) { }

  returnAll(): Observable<Permission[]>{
    const url = this.baseUrl + 'listar-permissoes';
    return this.httpClient.get<Permission[]>(url).pipe(
      perms => perms
    )
  }
}
