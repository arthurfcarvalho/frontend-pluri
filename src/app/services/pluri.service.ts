import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class PluriService {

  baseUrl = "http://localhost:8080/pluri";

  constructor(private httpClient: HttpClient, private tokenService: TokenService) { }

}
