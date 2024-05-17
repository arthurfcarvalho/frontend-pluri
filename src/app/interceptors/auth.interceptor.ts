
 import { Injectable } from '@angular/core';
 import {
   HttpRequest,
   HttpHandler,
   HttpEvent,
   HttpInterceptor,
   HttpInterceptorFn
 } from '@angular/common/http';
 import { TokenService } from '../services/token.service';

export const AuthInterceptor: HttpInterceptorFn = (req,next) =>  {
  
    const token = sessionStorage.getItem('token');
      
    const authReq = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      }) 
    return next(authReq);
}

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   constructor(private tokenService: TokenService) {}

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     if(this.tokenService.hasToken()){
      
//       const token = this.tokenService.returnToken();
      
//       request = request.clone({
//         setHeaders: {
//           'Authorization': `Bearer ${token}`
//         }
//       }) 
//     }
//     return next.handle(request)
//   }
// }