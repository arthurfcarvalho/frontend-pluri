import { ApiResponse } from './../types/api-response.type';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { SignupUser } from '../modules/auth/models/SignupUser.model';
import { jwtDecode } from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { User } from '../models/User.model';
import { Role } from '../models/Role.model';
import { ApiResponsePageable } from '../types/api-response-pageable.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User | null>(null)

  baseUrl = 'http://localhost:8080/usuario/';

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
    const url = this.baseUrl + `listar-usuario/${login}`;
    return this.http.get<User>(url);
  }
  returnUserId(login: string){
    const url = this.baseUrl + `retornaId/${login}`;
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

  returnAllUsers(){
    const url = `http://localhost:8080/usuario/listar`;
    return this.http.get<User[]>(url);
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

  retornaProfessores(): Observable<ApiResponsePageable>{
    const url = 'http://localhost:8080/usuario/listar-usuarios-professor'
    
    return this.http.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));;
  }

  retornaProfessoresPorArea(idArea: number): Observable<any>{
    const url = `http://localhost:8080/usuario/listar-por-area/${idArea}`
    
    return this.http.get<any>(url).pipe(map(
      obj => obj
    ));;
  }

  hasPermission(requiredPermissions: string[]): Observable<boolean> {
    const result = new Subject<boolean>();

    this.returnUserLogin().subscribe((login: any) => {
      this.returnUserByLogin(login.sub).subscribe((user: any) => {
        const hasPermission = user.dadosPerfil.some((perfil: any) => {
          return perfil.permissoes && perfil.permissoes.some((perm: any) => requiredPermissions.includes(perm.codigo));
        });
        result.next(hasPermission);
        result.complete();
      }, error => {
        result.next(false);
        result.complete();
      });
    }, error => {
      result.next(false);
      result.complete();
    });

    return result.asObservable();
  }

}