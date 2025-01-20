import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

/**
 * Interceptor responsável por adicionar o token de autenticação no cabeçalho das requisições HTTP.
 * Este interceptor é utilizado para garantir que as requisições protegidas pelo backend tenham o token de autorização.
 */
export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>,next) =>  {
  
  // Recupera o token armazenado no sessionStorage
  const token = sessionStorage.getItem('token');
  
  const authReq = req.clone({
    headers: req.headers.append('Authorization','Bearer ' + token)
  })
    
  return next(authReq);
}