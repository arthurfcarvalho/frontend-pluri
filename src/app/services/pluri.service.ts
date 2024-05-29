import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { Pluri } from '../models/Pluri.model';
import { PluriInformacoesGeraisDAO } from '../modules/pluri/models/PluriInformacoesGeraisDAO.model';

@Injectable({
  providedIn: 'root'
})
export class PluriService {

  baseUrl = "http://localhost:8080/pluri";

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  createPluri(data: PluriInformacoesGeraisDAO): Observable<Pluri> {
    const url = this.baseUrl + '/criar-pluri';
    return this.httpClient.post<Pluri>(url, data);
  }

}
