import { Injectable } from '@angular/core';
import { InvalidTokenError } from 'jwt-decode';

const AUTH_TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  saveToken(token: string) {
    if(!token){
      throw new InvalidTokenError('Token cannot be null or empty');
    }
    
    try {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token:', error);
    }
  }

  deleteToken() {
    try {
      sessionStorage.removeItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  }

  returnToken(): string | null {
    return sessionStorage.getItem(AUTH_TOKEN_KEY) ?? null;
  }

  hasToken(){
    return !!this.returnToken();
  }
}
