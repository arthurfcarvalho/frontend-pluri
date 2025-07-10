import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {catchError, forkJoin, map, Observable, of, switchMap, throwError} from "rxjs";

import { TokenService } from "./token.service";
import { ApiResponsePageable } from "../types/api-response-pageable.type";
import { environment } from "../../environments/environment";
import {Pluri} from "../models/Pluri/Pluri.model";
import Assunto from "../models/Assunto.model";
import {Disciplina} from "../modules/disciplina/models/disciplina";

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
    return this.httpClient.post<Assunto>(url, data);
  }

  editAssunto(data: Assunto): Observable<Assunto> {
    const url = this.baseUrl + 'editar-assunto';
    return this.httpClient.put<Assunto>(url, data);
  }

  /*findById(id: number): Observable<Assunto> {
    const url = this.baseUrl + buscar-por-id/${id};
    return this.httpClient.get<Assunto>(url);
  }*/

  findById(id: number): Observable<Assunto>{
    const url = this.baseUrl + `buscar-por-id/${id}`;
    return this.httpClient.get<Assunto>(url).pipe(map(
      obj => obj
    ));
  }

  listarPorDisciplina(id: any) {
    const url =  this.baseUrl + 'listar-assuntos-por-disciplina?disciplinaId=' + id +'&page=0&size=10&sort=nome';
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(obj => obj));
  }

  // listarTodosPorDisciplinas(disciplinaIds: (number | null)[]): Observable<any[]> {
  //   console.log(disciplinaIds)
  //   const requests = disciplinaIds.map(id => this.listarTodosPorDisciplina(id));
  //   return forkJoin(requests).pipe(
  //     map(resultados => resultados.flat()) // junta todas as listas em uma só
  //   );
  // }
  listarTodosPorDisciplinas(disciplinaIds: (number | null)[]): Observable<any[]> {
    const idsFiltrados = disciplinaIds.filter((id): id is number => id !== null);

    if (idsFiltrados.length === 0) {
      return of([]);
    }

    const idsParam = idsFiltrados.join(',');
    const url = `${this.baseUrl}listar-assuntos-por-disciplinas?ids=${idsParam}&sort=nome`;

    return this.httpClient.get<any[]>(url); // supondo que a resposta seja uma lista direta
  }


  private listarTodosPorDisciplina(disciplinaId: number | null): Observable<any[]> {
    const pageSize = 10;
    let page = 10000;
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
