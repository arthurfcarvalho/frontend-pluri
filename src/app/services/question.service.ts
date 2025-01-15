import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {catchError, map, Observable, throwError} from "rxjs";

import { TokenService } from "./token.service";
import { PluriInformacoesGeraisDAO } from "../models/Pluri/PluriInformacoesGeraisDAO.model";
import { Questao } from "../modules/professor/models/Question.model";
import { ApiResponsePageable } from "../types/api-response-pageable.type";
import { DadosAtualizarQuestao } from "../modules/professor/models/DadosAtualizarQuestao.model";
import { DadosDetalhamentoQuestao } from "../modules/professor/models/DadosDetalhamentoQuestao.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private readonly baseUrl = `${environment.apiUrl}/questao/`;

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  /**
   * Cria uma nova questão.
   * @param data Dados para a criação da questão.
   * @returns Observable contendo a questão criada.
   */
  createQuestion(data: PluriInformacoesGeraisDAO): Observable<Questao> {
    const url = this.baseUrl + 'criar-questao';
    return this.httpClient.post<Questao>(url, data);
  }

  /**
   * Lista as questões de um usuário com paginação.
   * @param userId ID do usuário.
   * @param page Número da página (padrão: 0).
   * @param size Quantidade de itens por página (padrão: 10).
   * @returns Observable contendo a lista paginada de questões do usuário.
   */
  listQuestionsUser(userId: number, page: number = 0, size: number = 10): Observable<any> {
    const url = this.baseUrl + `listar-questoes-usuario/${userId}?page=${page}&size=${size}`;
    return this.httpClient.get<any>(url);
  }

  /**
   * Busca uma questão pelo ID.
   * @param id ID da questão.
   * @returns Observable contendo os dados da questão.
   */
  listById(id: number){
    const url = this.baseUrl + `listar-questao/${id}`
    return this.httpClient.get<DadosAtualizarQuestao>(url).pipe(map(
      obj => obj
    ));
  }

  /**
   * Atualiza uma questão existente.
   * @param questao Dados atualizados da questão.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  updateQuestion(questao: DadosAtualizarQuestao){
    const url = this.baseUrl + `atualizar-questao`
    console.log("questaoService", questao)
    return this.httpClient.put(url,questao);
  }

  /**
   * Lista questões a serem enviadas associadas a um Pluri.
   * @param id ID do Pluri.
   * @returns Observable contendo a lista de questões a enviar.
   */
  listQuestoesAEnviar(id: number){
    const url = this.baseUrl + `listar-questoes-a-enviar/${id}`

    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));
  }

  /**
   * Lista questões inéditas de um usuário por área.
   * @param areaId ID da área.
   * @returns Observable contendo a lista de questões inéditas.
   */
  listQuestoesIneditasUsuarioPorArea(areaId: number): Observable<DadosDetalhamentoQuestao[]>{
    const url = this.baseUrl + `listar-questoes-ineditas/${areaId}`
    return this.httpClient.get<DadosDetalhamentoQuestao[]>(url).pipe(map(
      obj => obj
    ));
  }

  /**
   * Envia questões para um processo específico.
   * @param questao Dados das questões a serem enviadas.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  enviarQuestoes(questao: any){
    const url = this.baseUrl + `enviar-questoes`
    return this.httpClient.put(url,questao);
  }

  /**
   * Aprova uma questão.
   * @param id ID da questão a ser aprovada.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  aprovarQuestao(id: number){
    const url = this.baseUrl + `aprovar-questao/${id}`
    return this.httpClient.put(url,id).pipe(map(obj => obj));
  }

  /**
   * Reprova uma questão.
   * @param id ID da questão a ser reprovada.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  reprovarQuestao(id: number){
    const url = this.baseUrl + `reprovar-questao/${id}`;
    return this.httpClient.put(url,id).pipe(map(obj => obj));
  }

  /**
   * Lista as questões aprovadas por área com paginação.
   * @param id ID da área (opcional, pode ser null).
   * @param page Número da página.
   * @param size Quantidade de itens por página.
   * @returns Observable contendo a lista paginada de questões aprovadas.
   */
  listarAprovadasPorArea(id: number | null, page: number, size: number): Observable<ApiResponsePageable> {
    let url = `${this.baseUrl}aprovadas?page=${page}&size=${size}`;

    if (id !== null && id !== undefined) {
        url += `&areaId=${id}`;
    }

    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(obj => obj));
  }

  /**
   * Exclui uma questão pelo ID.
   * @param id ID da questão a ser excluída.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  deleteQuestao(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}deletar/${id}`).pipe(
      catchError(error => {
        return throwError(() => error);
      }));
  }
}
