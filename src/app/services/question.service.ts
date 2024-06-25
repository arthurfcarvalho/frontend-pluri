import { HttpClient } from "@angular/common/http";
import { TokenService } from "./token.service";
import { PluriInformacoesGeraisDAO } from "../models/Pluri/PluriInformacoesGeraisDAO.model";
import { map, Observable } from "rxjs";
import { Questao } from "../modules/professor/models/Question.model";
import { Injectable } from "@angular/core";
import { ApiResponsePageable } from "../types/api-response-pageable.type";
import { DadosAtualizarQuestao } from "../modules/professor/models/DadosAtualizarQuestao.model";

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  baseUrl = "http://localhost:8080/questao";

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

  createQuestion(data: PluriInformacoesGeraisDAO): Observable<Questao> {
    const url = this.baseUrl + '/criar-questao';
    return this.httpClient.post<Questao>(url, data);
  }
  
  listQuestionsUser(id: number){
    const url = this.baseUrl + `/listar-questoes-usuario/${id}`
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));
  }

  listById(id: number){
    const url = this.baseUrl + `/listar-questao/${id}`
    return this.httpClient.get<DadosAtualizarQuestao>(url).pipe(map(
      obj => obj
    ));
  }
  updateQuestion(questao: DadosAtualizarQuestao){
    const url = this.baseUrl + `/atualizar-questao`
    return this.httpClient.put(url,questao);
  }
  
}
