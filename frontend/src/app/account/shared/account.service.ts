import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from "rxjs/operators";
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  /* async login(user: any) {
    const result = await this.http.post<any>(`${environment.api}/signin/`, user).toPromise()
    if (result && result.token) {
      window.localStorage.setItem('token', result.token)
      return true
    }

    return false
  }
 */

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.api}/login`, { email: user.email, password: user.password })
      .pipe(map(response => {
        if (response && response.token) {
          window.localStorage.setItem('token', response.token)
        } else {
          return {}
        }
        return response
      }))
      .pipe(catchError((error: HttpErrorResponse) => {
        let msg: string
        if (error.error instanceof ErrorEvent) {
          // Erro de client-side ou de rede
          msg = error.error.message
          console.error('Ocorreu um erro:', error.error.message);
        } if (error.status == 0) {
          msg = "Sem comunicação com o servidor"
          console.error(
            `Código do erro ${error.status}, ` +
            `Erro: ${msg}`);
        } else {
          // Erro retornando pelo backend
          msg = JSON.stringify(error.error)
          console.error(
            `Código do erro ${error.status}, ` +
            `Erro: ${JSON.stringify(error.error)}`);
        }
        // retornar um observable com uma mensagem amigavel.
        return throwError(`LOGIN: ${msg}`);
      }))


  }

  register(account: { name: string, email: string, password: string, confirmPassword: string }): Observable<boolean> {
    return this.http.post<any>(`${environment.api}/register/`, account)
      .pipe(catchError((error: HttpErrorResponse) => {
        let msg: string
        if (error.error instanceof ErrorEvent) {
          // Erro de client-side ou de rede
          msg = error.error.message
          console.error('Ocorreu um erro:', error.error.message);
        } if (error.status == 0) {
          msg = "Sem comunicação com o servidor"
          console.error(
            `Código do erro ${error.status}, ` +
            `Erro: ${msg}`);
        } else {
          // Erro retornando pelo backend
          msg = JSON.stringify(error.error)
          console.error(
            `Código do erro ${error.status}, ` +
            `Erro: ${JSON.stringify(error.error)}`);
        }
        // retornar um observable com uma mensagem amigavel.
        return throwError(`REGISTRO: ${msg}`);
      }))

  }

  getAuthorizationToken() {
    const token = window.localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): Date {
    const decoded: any = jwt_decode(token)

    if (decoded.exp === undefined) {
      return new Date(0)
    }

    const date = new Date(0)
    date.setUTCSeconds(decoded.exp)
    return date
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === new Date(0)) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  isUserLoggedIn(): boolean {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }

    return true;
  }

  clear() {
    window.localStorage.setItem('token', '')
  }

}
