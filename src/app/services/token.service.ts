import { Injectable } from '@angular/core';


const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token: string){
    return sessionStorage.setItem(KEY, token);
  }
  deleteToken(){
    return sessionStorage.removeItem(KEY);
  }
  returnToken(){
    return sessionStorage.getItem(KEY) ?? "";
  }
  hasToken(){
    return !!this.returnToken();
  }
}
