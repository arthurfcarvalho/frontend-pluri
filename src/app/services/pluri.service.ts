import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, map, catchError, throwError} from 'rxjs';

import { TokenService } from './token.service';
import { Pluri } from '../models/Pluri/Pluri.model';
import { PluriInformacoesGeraisDAO } from '../models/Pluri/PluriInformacoesGeraisDAO.model';
import { PluriAtividadesComissaoDAO } from '../models/Pluri/PluriAtividadesComissaoDAO.model';
import { ApiResponsePageable } from '../types/api-response-pageable.type';
import { indicacaoDocentesDAO } from '../modules/ajuntador/models/IndicacaoDocentesDAO.model';
import { PluriInfoDAO } from '../models/Pluri/PluriInfoDAO.model';
import { DadosDetalhamentoInformacoesGerais } from '../modules/ajuntador/models/DadosDetalhamentoInformacoesGerais.mode';
import { DadosDetalhamentoQuestaoAEnviar } from '../modules/professor/models/DadosDetalhamentoQuestaoAEnviar.model';
import { DadosDetalhamentoQuestoesEnviadas } from '../modules/professor/models/DadosDetalhamentoQuestaoEnviadas.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PluriService {

  private readonly baseUrl = `${environment.apiUrl}/pluri/`;

  constructor(
    private httpClient: HttpClient, 
    private tokenService: TokenService
  ) {}

  /**
   * Cria um novo Pluri.
   * @param data Dados do novo Pluri.
   * @returns Observable contendo o Pluri criado.
   */
  createPluri(data: PluriInformacoesGeraisDAO): Observable<Pluri> {
    const url = this.baseUrl + 'criar-pluri';
    return this.httpClient.post<Pluri>(url, data);
  }

  /**
   * Atualiza as informações gerais de um Pluri.
   * @param data Dados para atualizar as informações gerais.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  updateInformacoesGerais(data: PluriInformacoesGeraisDAO){
    const url = this.baseUrl + 'atualizar-informacoes-gerais';
    return this.httpClient.put(url, data);
  }

  /**
   * Atualiza as atividades da comissão de um Pluri.
   * @param data Dados para atualizar as atividades da comissão.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  updateAtividadesComissao(data: PluriAtividadesComissaoDAO){
    const url = this.baseUrl + 'atualizar-atividades-comissao';
    return this.httpClient.put(url, data);
  }

  /**
   * Atualiza as informações de aplicação de um Pluri.
   * @param data Dados para atualizar as informações de aplicação.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  updateInformacoesAplicacao(data: PluriInformacoesGeraisDAO){
    const url = this.baseUrl + 'atualizar-informacoes-aplicacao';
    return this.httpClient.put(url, data);
  }

  /**
   * Lista os Pluris não realizados com paginação.
   * @param page Número da página (padrão: 0).
   * @param size Quantidade de itens por página (padrão: 10).
   * @returns Observable contendo os Pluris não realizados.
   */
  searchUnfinishedPluris(page: number = 0, size: number = 10): Observable<ApiResponsePageable>{
    const url = this.baseUrl + `listar-pluris-nao-realizados?page=${page}&size=${size}`

    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));
  }

  /**
   * Busca um Pluri pelo ID.
   * @param id ID do Pluri.
   * @returns Observable contendo os dados do Pluri.
   */
  searchPluriById(id: number){
    const url = this.baseUrl + `listar-pluri/${id}`;
    return this.httpClient.get<Pluri>(url).pipe(map(
      obj => obj
    ));
  }

  /**
   * Obtém informações gerais de um Pluri.
   * @param id ID do Pluri.
   * @returns Observable contendo as informações gerais.
   */
  getPluriGeneralInfo(id: number){
    const url = this.baseUrl + `listar-informacoes-gerais/${id}`;
    return this.httpClient.get<PluriInfoDAO>(url).pipe(map(
      obj => obj
    ));
  }

  /**
   * Submete a indicação de docentes que devem enviar questões pro Pluri.
   * @param data Dados da indicação.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  submitIndicacaoDocentes(data: indicacaoDocentesDAO){
    const url = this.baseUrl + `pedir-questoes`;
    return this.httpClient.post(url, data);
  }

  /**
   * Define as áreas do Pluri.
   * @param data Dados para definir as áreas.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  defineArea(data: any){
    const url = this.baseUrl + 'definir-questoes-area';
    return this.httpClient.put(url, data);
  }

  /**
   * Lista todas as áreas de Pluris vinculadas a um usuário com paginação.
   * @param idusuario ID do usuário.
   * @param page Número da página.
   * @param size Quantidade de itens por página.
   * @returns Observable com a lista paginada de áreas vinculadas aos Pluris.
   */
  listPluriArea(idusuario: number, page: number, size: number): Observable<ApiResponsePageable>{
    //const url = this.baseUrl + '/listar-pluri-areas'
    const url = this.baseUrl + `listar-pluris-e-suas-areas?page=${page}&size=${size}`;
      return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
        obj => obj
      ));
  }

  /**
   * Obtém a listagem de informações para indicação, baseada no ID de um Pluri.
   * @param id ID do Pluri para o qual a indicação será feita.
   * @returns Observable contendo os dados detalhados necessários para a indicação.
   */
  listagemParaIndicacao(id: number){
    const url = this.baseUrl + `listagem-para-indicacao/${id}`;
    return this.httpClient.get<DadosDetalhamentoInformacoesGerais>(url).pipe(map(
      obj => obj
    ));
  }

  /**
   * Lista as questões a serem enviadas associadas a um Pluri.
   * @param id ID do Pluri.
   * @returns Observable contendo os dados detalhados das questões a enviar.
   */
  listarQuestoesAEnviarPorId(id: number){
    const url = this.baseUrl + `listar-questao-a-enviar/${id}`;
    return this.httpClient.get<DadosDetalhamentoQuestaoAEnviar>(url).pipe(map(
      obj => obj
    ));
  }

  /**
   * Lista as questões enviadas associadas a um Pluri.
   * @param id ID do Pluri.
   * @returns Observable contendo os dados detalhados das questões enviadas.
   */
  listarQuestoesEnviadas(id: number){
  const url = this.baseUrl + `listar-questoes-enviadas/${id}`;
    return this.httpClient.get<DadosDetalhamentoQuestoesEnviadas>(url).pipe(map(
      obj => obj
    ));
  }

  /**
   * Lista as áreas de um Pluri com paginação.
   * @param idPluri ID do Pluri.
   * @param page Número da página.
   * @param size Quantidade de itens por página.
   * @returns Observable com as áreas do Pluri.
   */
  listarPluriAreasByPluri(idPluri: number, page: number, size: number): Observable<ApiResponsePageable> {
    const url = `${this.baseUrl}listar-pluri-areas-pluri/${idPluri}?page=${page}&size=${size}`;
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(obj => obj));
  }

  /**
   * Exclui um Pluri pelo ID.
   * @param id ID do Pluri a ser excluído.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  deletePluri(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}deletar/${id}`).pipe(
      catchError(error => {
        return throwError(() => error);
      }));
  }

  /**
   * Exclui uma área de um Pluri pelo ID.
   * @param id ID da área a ser excluída.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  deleteArea(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}deletar-pluri-area/${id}`).pipe(
      catchError(error => {
        return throwError(() => error);
      }));
  }

  /**
   * Exclui questões a enviar de um Pluri.
   * @param id ID da questão a ser excluída.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  deleteQuestoesAEnviar(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}deletar-questao-a-enviar/${id}`).pipe(
      catchError(error => {
        return throwError(() => error);
      }));
  }
}
