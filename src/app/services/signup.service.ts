import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private httpClient: HttpClient) { }

  signup(nome: string, email: string, login: string, senha: string, data_nascimento: Date) {

    const data = {
      nome,
      email,
      login,
      senha,
      data_nascimento: new DatePipe('en-US').transform(data_nascimento, 'yyyy-MM-ddTHH:mm:ss')
    }

    return this.httpClient.post<any>("http://localhost:8080/usuario/registrar", data);
  }
}
