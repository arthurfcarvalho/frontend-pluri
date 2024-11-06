import { HttpClient } from "@angular/common/http";
import { TokenService } from "./token.service";
import { PluriInformacoesGeraisDAO } from "../models/Pluri/PluriInformacoesGeraisDAO.model";
import { map, Observable } from "rxjs";
import { Questao } from "../modules/professor/models/Question.model";
import { Injectable } from "@angular/core";
import { ApiResponsePageable } from "../types/api-response-pageable.type";
import { DadosAtualizarQuestao } from "../modules/professor/models/DadosAtualizarQuestao.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  baseUrl = environment.apiUrl + '/assunto/';

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }
  
  listarAssuntos(){
    const url = this.baseUrl + `listar-assuntos`
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));
  }
}
