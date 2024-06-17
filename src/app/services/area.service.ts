import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiResponsePageable } from '../types/api-response-pageable.type';

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
}
