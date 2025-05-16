import { Injectable } from '@angular/core';
import {InvalidTokenError, jwtDecode, JwtPayload} from 'jwt-decode';

const KEY = 'token'; // Chave utilizada para armazenar o token no armazenamento de sessão

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  /**
   * Salva o token no armazenamento de sessão.
   * @param token O token a ser salvo.
   * @throws InvalidTokenError Se o token for nulo ou vazio.
   */
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

  /**
   * Remove o token do armazenamento de sessão.
   */
  deleteToken() {
    try {
      sessionStorage.removeItem(KEY);
    } catch (error) {
      console.error('Error deleting token:', error);
    }
  }

  /**
   * Retorna o token armazenado no armazenamento de sessão.
   * @returns O token armazenado ou `null` se não existir.
   */
  returnToken(): string | null {
    return sessionStorage.getItem(KEY) ?? null;
  }

  /**
   * Verifica se existe um token armazenado.
   * @returns `true` se houver um token, caso contrário, `false`.
   */
  hasToken() {
    const token = this.returnToken();
    if (!token) {
      return false;
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp !== undefined) {
        return decoded.exp > now;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

}
