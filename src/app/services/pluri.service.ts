import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable, map } from 'rxjs';
import { Pluri } from '../models/Pluri.model';
import { PluriInformacoesGeraisDAO } from '../modules/pluri/models/PluriInformacoesGeraisDAO.model';
import { PluriAtividadesComissaoDAO } from '../modules/pluri/models/PluriAtividadesComissaoDAO.model';
import { ApiResponsePageable } from '../types/api-response-pageable.type';

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

  updateInformacoesGerais(data: PluriInformacoesGeraisDAO){
    const url = this.baseUrl + '/atualizar-informacoes-gerais';
    return this.httpClient.put(url, data);
  }

  updateAtividadesComissao(data: PluriAtividadesComissaoDAO){
    const url = this.baseUrl + '/atualizar-atividades-comissao';
    return this.httpClient.put(url, data);
  }

  updateInformacoesAplicacao(data: PluriInformacoesGeraisDAO){
    const url = this.baseUrl + '/atualizar-informacoes-aplicacao';
    return this.httpClient.put(url, data);
  }

  searchUnfinishedPluris(): Observable<ApiResponsePageable>{
    const url = this.baseUrl + `/listar-pluris-nao-realizados`;
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));
  }

  searchPluriById(id: number){
    const url = this.baseUrl + `/listar-pluri/${id}`;
    return this.httpClient.get<Pluri>(url).pipe(map(
      obj => obj
    ));
  }

}
