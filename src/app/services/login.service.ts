import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = 'http://200.131.116.21:8081/usuario/';
  
  //baseUrl = 'http://200.131.116.21:8081/usuario/';

  constructor(private userService: UserService, private httpClient: HttpClient) { }

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
