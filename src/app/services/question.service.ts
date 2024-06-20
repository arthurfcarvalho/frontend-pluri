import { HttpClient } from "@angular/common/http";
import { TokenService } from "./token.service";
import { PluriInformacoesGeraisDAO } from "../models/Pluri/PluriInformacoesGeraisDAO.model";
import { Observable } from "rxjs";
import { Questao } from "../modules/professor/models/Question.model";
import { Injectable } from "@angular/core";

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


}
