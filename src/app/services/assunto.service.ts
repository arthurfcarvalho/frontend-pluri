import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

import { TokenService } from "./token.service";
import { ApiResponsePageable } from "../types/api-response-pageable.type";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  private readonly baseUrl = `${environment.apiUrl}/assunto/`;

  constructor(
    private httpClient: HttpClient, 
    private tokenService: TokenService
  ) {}
  
  /**
   * Lista todos os assuntos cadastrados.
   * @returns Observable contendo a resposta paginada do backend.
   */
  listarAssuntos(){
    const url = this.baseUrl + `listar-assuntos`
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));
  }
}
