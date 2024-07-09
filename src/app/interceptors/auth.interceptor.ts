import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>,next) =>  {
  
  const token = sessionStorage.getItem('token');
  const authReq = req.clone({
    headers: req.headers.append('Authorization','Bearer ' + token)
  })
    
  return next(authReq);
}