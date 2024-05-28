import { Injectable } from '@angular/core';
import { InvalidTokenError } from 'jwt-decode';

const KEY = 'token';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  saveToken(token: string) {
    if(!token){
      throw new InvalidTokenError('Token cannot be null or empty');
    }
    
    try {
      sessionStorage.setItem(KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  deleteToken() {
    try {
      sessionStorage.removeItem(KEY);
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  }

  returnToken(): string | null {
    return sessionStorage.getItem(KEY) ?? null;
  }

  hasToken(){
    return !!this.returnToken();
  }
}
