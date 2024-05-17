import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req,next) =>  {
  
    const token = sessionStorage.getItem('token');
      
    const authReq = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      }) 
    return next(authReq);
}