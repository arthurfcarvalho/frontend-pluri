import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import {catchError, map, Observable, throwError} from "rxjs";

import { TokenService } from "./token.service";
import { environment } from "../../environments/environment";
import {Disciplina} from "../modules/disciplina/models/disciplina";
import {PluriInfoDAO} from "../models/Pluri/PluriInfoDAO.model";
import {ApiResponsePageable} from "../types/api-response-pageable.type";

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {

  private readonly baseUrl = `${environment.apiUrl}/disciplina/`;

  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  // createDisciplina(data: Disciplina): Observable<Disciplina> {
  //   const url = this.baseUrl + 'criar-disciplina';
  //   return this.httpClient.post<any>(url, data);
  // }
  createDisciplina(data: Disciplina): Observable<Disciplina> {
    const url = this.baseUrl + 'criar-disciplina';
    return this.httpClient.post<Disciplina>(url, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
  editDisciplina(data: Disciplina): Observable<Disciplina> {
    const url = this.baseUrl + 'editar-disciplina';
    return this.httpClient.put<Disciplina>(url, data, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  listarDisciplinasPorArea(idArea: number) {
    const url =  this.baseUrl + 'listar-disciplinas-por-area?areaId=' + idArea +'&page=0&size=10&sort=nome';
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(obj => obj));
  }
  listById(id: number) {
    const url =  this.baseUrl + 'listar-disciplina/'+id;
    return this.httpClient.get<Disciplina>(url).pipe(map(obj => obj));
  }
  listarDisciplinasPage(page: number = 0, size: number = 10): Observable<any> {
    const url = this.baseUrl + `listar-disciplinas-page?page=${page}&size=${size}`;
    return this.httpClient.get<any>(url);
  }
  listarDisciplinas() {
    const url = this.baseUrl + 'listar-disciplinas';
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(obj => obj));
  }
  deleteDisciplina(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}deletar/${id}`).pipe(
      catchError(error => {
        return throwError(() => error);
      }));
  }
}
