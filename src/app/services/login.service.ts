import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://localhost:8080/usuario/';

  constructor(private httpClient: HttpClient) { }

  login(login: string, senha: string) {

    const url = this.baseUrl + 'login';

    return this.httpClient.post<LoginResponse>(url, {login, senha}).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token);
      })
    )
  }
}
