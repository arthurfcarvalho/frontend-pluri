import { Injectable } from '@angular/core';


const KEY = 'token';
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token: string){
    console.log('token: ', token)
    return localStorage.setItem(KEY, token);
  }
  deleteToken(){
    return localStorage.removeItem(KEY);
  }
  returnToken(){
    console.log(KEY)
    return localStorage.getItem(KEY) ?? "";
  }
  hasToken(){
    return !!this.returnToken();
  }
}
