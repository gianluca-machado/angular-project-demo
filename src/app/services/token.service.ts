import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

/**
 * Token Provider
 *
 * Provide token method
 */
@Injectable()
export class TokenService {
  /**
   * Token value
   */
  private token: string;

  /**
   * Get setted token.
   * @returns A string.
   */
  getToken(): string {
    return this.token;
  }

  /**
   * Set token
   */
  setToken(token: string): void {
    this.token = token;
  }

  /**
   * Decode jwt token.
   */
  getDataToken(): any {
    return jwt_decode(this.token);
  }
}
