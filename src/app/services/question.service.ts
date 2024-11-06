import { HttpClient } from "@angular/common/http";
import { TokenService } from "./token.service";
import { PluriInformacoesGeraisDAO } from "../models/Pluri/PluriInformacoesGeraisDAO.model";
import { map, Observable } from "rxjs";
import { Questao } from "../modules/professor/models/Question.model";
import { Injectable } from "@angular/core";
import { ApiResponsePageable } from "../types/api-response-pageable.type";
import { DadosAtualizarQuestao } from "../modules/professor/models/DadosAtualizarQuestao.model";
import { DadosDetalhamentoQuestao } from "../modules/professor/models/DadosDetalhamentoQuestao.model";
import { Area } from "../models/Area.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseUrl = environment.apiUrl + '/questao/';

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  createQuestion(data: PluriInformacoesGeraisDAO): Observable<Questao> {
    const url = this.baseUrl + 'criar-questao';
    return this.httpClient.post<Questao>(url, data);
  }
  
  /*listQuestionsUser(id: number){
    const url = this.baseUrl + `listar-questoes-usuario/${id}`
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));
  }*/
  
  listQuestionsUser(userId: number, page: number = 0, size: number = 10): Observable<any> {
    const url = this.baseUrl + `listar-questoes-usuario/${userId}?page=${page}&size=${size}`;
    return this.httpClient.get<any>(url);
  }
  

  listById(id: number){
    const url = this.baseUrl + `listar-questao/${id}`
    return this.httpClient.get<DadosAtualizarQuestao>(url).pipe(map(
      obj => obj
    ));
  }
  updateQuestion(questao: DadosAtualizarQuestao){
    const url = this.baseUrl + `atualizar-questao`
    return this.httpClient.put(url,questao);
  }

  listQuestoesAEnviar(id: number){
    const url = this.baseUrl + `listar-questoes-a-enviar/${id}`
    
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));
  }
  listQuestoesIneditasUsuarioPorArea(areaId: number): Observable<DadosDetalhamentoQuestao[]>{
    const url = this.baseUrl + `listar-questoes-ineditas/${areaId}`
    return this.httpClient.get<DadosDetalhamentoQuestao[]>(url).pipe(map(
      obj => obj
    ));
  }
  enviarQuestoes(questao: any){
    const url = this.baseUrl + `enviar-questoes`
    return this.httpClient.put(url,questao);
  }
  aprovarQuestao(id: number){
    const url = this.baseUrl + `aprovar-questao/${id}`
    return this.httpClient.put(url,id).pipe(map(obj => obj));
  }
  reprovarQuestao(id: number){
    const url = this.baseUrl + `reprovar-questao/${id}`;
    return this.httpClient.put(url,id).pipe(map(obj => obj));
  }

  listarAprovadasPorArea(id: number | null, page: number, size: number): Observable<ApiResponsePageable> {
    let url = `${this.baseUrl}aprovadas?page=${page}&size=${size}`;

    if (id !== null && id !== undefined) {
        url += `&areaId=${id}`;
    }

    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(obj => obj));
}

  
}
