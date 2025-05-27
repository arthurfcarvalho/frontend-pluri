import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { SignupUser } from '../modules/auth/models/SignupUser.model';
import { ApiResponse } from './../types/api-response.type';
import { TokenService } from './token.service';
import { User } from '../models/User.model';
import { Role } from '../models/Role.model';
import { ApiResponsePageable } from '../types/api-response-pageable.type';
import { MessageModel } from '../modules/home/models/MessageModel';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // gerencia o estado o usuário logado
  private userSubject = new BehaviorSubject<User | null>(null)

  private readonly baseUrl = `${environment.apiUrl}/usuario/`;

  constructor(private http: HttpClient, private tokenService: TokenService) {
    // Decodifica o token JWT e atualiza o usuário logado ao inicializar o serviço
    if(this.tokenService.hasToken()){
      this.decodeJWT();
    }
  }

  /**
   * Decodifica o token JWT armazenado e atualiza o usuário logado no `userSubject`.
   */
  decodeJWT(){
    if(this.tokenService.hasToken()){
      const user = jwtDecode(this.tokenService.returnToken()!) as User;
      this.userSubject.next(user);
    }
  }

  /**
   * Retorna o usuário logado como um Observable.
   * @returns Observable contendo o usuário logado ou `null`.
   */
  returnUserLogin(){
    return this.userSubject.asObservable();
  }

  /**
   * Retorna um usuário pelo login.
   * @param login Login do usuário.
   * @returns Observable contendo os dados do usuário.
   */
  returnUserByLogin(login: string){
    const url = this.baseUrl + `listar-usuario`;
    return this.http.get<User>(url);
  }

  /**
   * Retorna o ID de um usuário pelo login.
   * @param login Login do usuário.
   * @returns Observable contendo o ID do usuário.
   */
  returnUserId(login: string){
    const url = this.baseUrl + `retornaId/${login}`;
    return this.http.get<number>(url);
  }

  /**
   * Salva o token e decodifica o JWT para atualizar o estado do usuário logado.
   * @param token Token de autenticação a ser salvo.
   */
  saveToken(token: string){
    this.tokenService.saveToken(token);
    this.decodeJWT();
  }

  /**
   * Faz logout do usuário, removendo o token e limpando o estado do usuário logado.
   */
  logout(){
    this.tokenService.deleteToken();
    this.userSubject.next(null);
  }

  /**
   * Verifica se o usuário está autenticado.
   * @returns `true` se o token estiver armazenado, caso contrário, `false`.
   */
  isAuthenticated(){
    return this.tokenService.hasToken();
  }

  /**
   * Retorna um usuário pelo ID.
   * @param id ID do usuário.
   * @returns Observable contendo os dados do usuário.
   */
  searchUserById(id: number): Observable<User> {
    const url = `${this.baseUrl}listar/${id}`;
    return this.http.get<User>(url);
  }

  /**
   * Retorna todos os usuários cadastrados.
   * @returns Observable contendo a lista de usuários.
   */
  returnAllUsers(){
    const url = `${this.baseUrl}listar`;
    return this.http.get<User[]>(url);
  }

  /**
   * Atribui perfis a um usuário.
   * @param id ID do usuário.
   * @param role Lista de papéis a serem atribuídos.
   * @returns Observable indicando o sucesso ou falha da operação.
   */
  assignRoles(id: number, role: Role[]): Observable<any> {
    const url = `${this.baseUrl}atualizar-perfis`;
    const data = { id: id, perfis: role };
    return this.http.put(url, data).pipe(
      map((response: any) => response)
    );
  }

  /**
   * Registra um novo usuário no sistema.
   * @param user Dados do novo usuário.
   * @returns Observable contendo a resposta do backend.
   */
  signup(user: SignupUser): Observable<ApiResponse>{
    const url = `${this.baseUrl}registrar`;
    return this.http.post<ApiResponse>(url, user);
  }

  /**
   * Retorna os todos os usuários que tem o perfil de professor cadastrados.
   * @returns Observable contendo uma lista paginada de professores.
   */
  retornaProfessores(): Observable<ApiResponsePageable>{
    const url = `${this.baseUrl}listar-usuarios-professor`

    return this.http.get<ApiResponsePageable>(url).pipe(map(
      obj => obj
    ));;
  }

  /**
   * Retorna os professores vinculados a uma área específica.
   * @param idArea ID da área.
   * @returns Observable contendo a lista de professores.
   */
  retornaProfessoresPorArea(idArea: number): Observable<any>{
    const url = `${this.baseUrl}listar-por-area/${idArea}`

    return this.http.get<any>(url).pipe(map(
      obj => obj
    ));;
  }

  /**
   * Retorna as notificações de um usuário.
   * @param idUser ID do usuário.
   * @returns Observable contendo a lista de notificações.
   */
  returnUserNotifications(idUser: number): Observable<MessageModel[]>{
    const url = `${this.baseUrl}messages/${idUser}`

    return this.http.get<MessageModel[]>(url).pipe(map(
      obj => obj
    ));;
  }

  /**
   * Verifica se o usuário logado possui as permissões necessárias.
   * @param requiredPermissions Lista de permissões necessárias.
   * @returns Observable que emite `true` se o usuário possuir as permissões, caso contrário, `false`.
   */
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
