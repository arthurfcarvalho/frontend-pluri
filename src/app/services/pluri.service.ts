import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable, map } from 'rxjs';
import { Pluri } from '../models/Pluri/Pluri.model';
import { PluriInformacoesGeraisDAO } from '../models/Pluri/PluriInformacoesGeraisDAO.model';
import { PluriAtividadesComissaoDAO } from '../models/Pluri/PluriAtividadesComissaoDAO.model';
import { ApiResponsePageable } from '../types/api-response-pageable.type';
import { indicacaoDocentesDAO } from '../modules/ajuntador/models/IndicacaoDocentesDAO.model';
import { PluriInfoDAO } from '../models/Pluri/PluriInfoDAO.model';
import { PluriArea } from '../models/Pluri/PluriArea.model';
import { DadosDetalhamentoInformacoesGerais } from '../modules/ajuntador/models/DadosDetalhamentoInformacoesGerais.mode';
import { DadosDetalhamentoQuestaoAEnviar } from '../modules/professor/models/DadosDetalhamentoQuestaoAEnviar.model';
import { DadosDetalhamentoQuestoesEnviadas } from '../modules/professor/models/DadosDetalhamentoQuestaoEnviadas.model';
import { URLS } from '../../assets/constantes';

@Injectable({
  providedIn: 'root'
})
export class PluriService {

  //baseUrl = "http://200.131.116.21:8081/pluri";
  baseUrl = `${URLS.IP_LOCAL}/pluri`;

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

  searchUnfinishedPluris(page: number = 0, size: number = 10): Observable<ApiResponsePageable>{
    const url = this.baseUrl + `/listar-pluris-nao-realizados?page=${page}&size=${size}`
  
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

  getPluriGeneralInfo(id: number){
    const url = this.baseUrl + `/listar-informacoes-gerais/${id}`;
    return this.httpClient.get<PluriInfoDAO>(url).pipe(map(
      obj => obj
    ));
  }

  submitIndicacaoDocentes(data: indicacaoDocentesDAO){
    const url = this.baseUrl + `/pedir-questoes`;
    return this.httpClient.post(url, data);
  }

  defineArea(data: any){
    const url = this.baseUrl + '/definir-questoes-area';
    return this.httpClient.put(url, data);
  }

  listPluriArea(idusuario: number, page: number, size: number): Observable<ApiResponsePageable>{
    //const url = this.baseUrl + '/listar-pluri-areas'
    const url = this.baseUrl + `/listar-pluris-e-suas-areas?page=${page}&size=${size}`;
      return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
        obj => obj
      ));
  }

  listagemParaIndicacao(id: number){
    const url = this.baseUrl + `/listagem-para-indicacao/${id}`;
    return this.httpClient.get<DadosDetalhamentoInformacoesGerais>(url).pipe(map(
      obj => obj
    ));
  }
  listarQuestoesAEnviarPorId(id: number){
    const url = this.baseUrl + `/listar-questao-a-enviar/${id}`;
    return this.httpClient.get<DadosDetalhamentoQuestaoAEnviar>(url).pipe(map(
      obj => obj
    ));
  }
  listarQuestoesEnviadas(id: number){
  const url = this.baseUrl + `/listar-questoes-enviadas/${id}`;
    return this.httpClient.get<DadosDetalhamentoQuestoesEnviadas>(url).pipe(map(
      obj => obj
    ));
  }
  

}