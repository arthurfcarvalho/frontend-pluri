import { Injectable } from '@angular/core';


const KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  saveToken(token: string){
    console.log('token: ', token)
    return sessionStorage.setItem(KEY, token);
  }
  deleteToken(){
    return sessionStorage.removeItem(KEY);
  }
  returnToken(){
    console.log(KEY)
    return sessionStorage.getItem(KEY) ?? "";
  }
  hasToken(){
    return !!this.returnToken();
  }
}
