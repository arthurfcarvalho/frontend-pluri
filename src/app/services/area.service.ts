import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponsePageable } from '../types/api-response-pageable.type';
import { Area } from '../models/Area.model';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  baseUrl = 'http://localhost:8080/area/';

  constructor(private httpClient: HttpClient) { }

  returnAllAreas(): Observable<ApiResponsePageable>{
    const url = this.baseUrl + 'listar-areas';
    return this.httpClient.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));
  }
  listarPorId(id: number): Observable<Area>{
    const url = this.baseUrl + `listar-por-id/${id}`
    return this.httpClient.get<Area>(url).pipe(map(
      obj => obj
    ));
  }

  createArea(data: any) {
    const url = this.baseUrl + 'criar-area';
    return this.httpClient.post(url, data);
  } 
}
