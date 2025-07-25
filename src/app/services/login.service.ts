import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

import { LoginResponse } from '../types/login-response.type';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly baseUrl = `${environment.apiUrl}/usuario/`;

  constructor(
    private userService: UserService, 
    private httpClient: HttpClient
  ) {}

  /**
   * Realiza o login do usuário.
   * @param login O login do usuário.
   * @param senha A senha do usuário.
   * @returns Observable que emite a resposta do backend contendo o token de autenticação.
   */
  login(login: string, senha: string) {

    const url = this.baseUrl + 'login';

    return this.httpClient.post<LoginResponse>(url, {login, senha}).pipe(
      tap((value) => {
        const authToken = value.token || '';
        this.userService.saveToken(authToken);
      })
    )
  }
}
