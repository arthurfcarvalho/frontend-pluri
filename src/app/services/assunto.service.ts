import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {catchError, forkJoin, map, Observable, of, switchMap, throwError} from "rxjs";

import { TokenService } from "./token.service";
import { ApiResponsePageable } from "../types/api-response-pageable.type";
import { environment } from "../../environments/environment";
import {Pluri} from "../models/Pluri/Pluri.model";
import Assunto from "../models/Assunto.model";

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {

  private readonly baseUrl = `${environment.apiUrl}/assunto/`;

  constructor(
    private httpClient: HttpClient,
  ) {}

  /**
   * Lista todos os assuntos cadastrados.
   * @returns Observable contendo a resposta paginada do backend.
   */
  listarAssuntos(){
    const url = this.baseUrl + `listar-assuntos`
    return this.httpClient.get<Assunto[]>(url).pipe(map(
      obj => obj
    ));
  }

  listAssuntosPage(page: number = 0, size: number = 10): Observable<any> {
    const url = this.baseUrl + `listar-assuntos-page?page=${page}&size=${size}`;
    return this.httpClient.get<any>(url);
  }
  listarAssuntosPage(){
    const url = this.baseUrl + `listar-assuntos`
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));
  }
  createAssunto(data: Assunto): Observable<Assunto> {
    const url = this.baseUrl + 'criar-assunto';
    return this.httpClient.post<Pluri>(url, data);
  }

  listarPorDisciplina(id: any) {
    const url =  this.baseUrl + 'listar-assuntos-por-disciplina?disciplinaId=' + id +'&page=0&size=10&sort=nome';
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(obj => obj));
  }

  listarTodosPorDisciplinas(disciplinaIds: (number | null)[]): Observable<any[]> {
    const requests = disciplinaIds.map(id => this.listarTodosPorDisciplina(id));
    return forkJoin(requests).pipe(
      map(resultados => resultados.flat()) // junta todas as listas em uma só
    );
  }

  private listarTodosPorDisciplina(disciplinaId: number | null): Observable<any[]> {
    const pageSize = 10;
    let page = 0;
    let todosAssuntos: any[] = [];

    const fetchPage = (): Observable<any[]> => {
      const url = `${this.baseUrl}listar-assuntos-por-disciplina?disciplinaId=${disciplinaId}&page=${page}&size=${pageSize}&sort=nome`;

      return this.httpClient.get<ApiResponsePageable>(url).pipe(
        switchMap(response => {
          todosAssuntos = todosAssuntos.concat(response.content);
          if (!response.last) {
            page++;
            return fetchPage();
          } else {
            return of(todosAssuntos);
          }
        })
      );
    };

    return fetchPage();
  }

  deleteAssunto(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}deletar/${id}`).pipe(
      catchError(error => {
        return throwError(() => error);
      }));
  }
}
