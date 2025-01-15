import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { Area } from '../models/Area.model';
import { ApiResponsePageable } from '../types/api-response-pageable.type';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  private readonly baseUrl = `${environment.apiUrl}/area/`;

  constructor(private httpClient: HttpClient) {}

  /**
   * Retorna todas as áreas cadastradas.
   * @returns Observable contendo a resposta paginada do backend.
   */
  returnAllAreas(): Observable<ApiResponsePageable>{
    const url = this.baseUrl + 'listar-areas';
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));
  }

  /**
   * Busca uma área pelo ID.
   * @param id Identificador da área a ser buscada.
   * @returns Observable contendo os dados da área.
   */
  listarPorId(id: number): Observable<Area>{
    const url = this.baseUrl + `listar-por-id/${id}`
    return this.httpClient.get<Area>(url).pipe(map(
      obj => obj
    ));
  }

  /**
   * Cria uma nova área.
   * @param data Dados da nova área a ser criada.
   * @returns Observable com a resposta do backend.
   */
  createArea(data: any) {
    const url = this.baseUrl + 'criar-area';
    return this.httpClient.post(url, data);
  } 
}
