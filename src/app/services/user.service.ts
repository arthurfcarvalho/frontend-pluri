import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { SignupUser } from '../modules/auth/models/SignupUser.model';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { User } from '../models/User.model';
import { Role } from '../models/Role.model';
import { ApiResponse } from '../types/api-response.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User | null>(null)

  constructor(private http: HttpClient, private tokenService: TokenService) { 
    if(this.tokenService.hasToken()){
      this.decodeJWT();
    }
  }

  decodeJWT(){
    if(this.tokenService.hasToken()){
      const user = jwtDecode(this.tokenService.returnToken()!) as User;
      this.userSubject.next(user);
    }
  }

  returnUserLogin(){
    return this.userSubject.asObservable();
  }

  returnUserByLogin(login: string){
    const url = `http://localhost:8080/usuario/listar-usuario/${login}`;
    return this.http.get<User>(url);
  }
  returnUserId(login: string){
    const url = `http://localhost:8080/usuario/retornaId/${login}`;
    return this.http.get<number>(url);
  }

  saveToken(token: string){ 
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  logout(){
    this.tokenService.deleteToken();
    this.userSubject.next(null);
  }

  isAuthenticated(){
    return this.tokenService.hasToken();
  }

  searchUserById(id: number): Observable<User> {
    const url = `http://localhost:8080/usuario/listar/${id}`;
    return this.http.get<User>(url);
  }

  assignRoles(id: number, role: Role[]): Observable<any> {
    const url = 'http://localhost:8080/usuario/atualizar-perfis';
    const data = { id: id, perfis: role };
    return this.http.put(url, data).pipe(
      map((response: any) => response)
    );
  }

  signup(user: SignupUser): Observable<ApiResponse>{
    const url = 'http://localhost:8080/usuario/registrar';
    return this.http.post<ApiResponse>(url, user);
  }
}