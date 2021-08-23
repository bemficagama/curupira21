import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Key } from './key';
import { Category } from 'src/app/category/shared/category';
import { KeyRequest } from './key-request';
import { AccountService } from 'src/app/account/shared/account.service';
import { Router } from '@angular/router';

@Injectable()
export class KeyService {

  constructor(
    private http: HttpClient,
    private accountService: AccountService,
    private router: Router
  ) { }

  getAll(page: number = 1, per_page: number = 4, main_category: number = 0, search: string = '', path: string): Observable<KeyRequest> {
    return this.http.get<KeyRequest>(`${environment.api}/v1/key?page=${page}&perPage=${per_page}&main_category=${main_category}&search=${search}&path=${path}`)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.accountService.clear();
          this.router.navigateByUrl("/login");
          return throwError(`TOKEN: Token Inválido`);
        }
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
          msg = JSON.stringify(error.error.status)
          console.error(
            `Código do erro ${error.status}, ` +
            `Erro: ${JSON.stringify(error.error)}`);
        }
        // retornar um observable com uma mensagem amigavel.
        return throwError(`CARREGAR: ${msg}`);
      }));
  }

  getMains(): Observable<Category[] | null> {
    return this.http.get<Category[]>(`${environment.api}/v1/category-mains`)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.accountService.clear();
          this.router.navigateByUrl("/login");
          return throwError(`TOKEN: Token Inválido`);
        }
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
          msg = JSON.stringify(error.error.status)
          console.error(
            `Código do erro ${error.status}, ` +
            `Erro: ${JSON.stringify(error.error)}`);
        }
        // retornar um observable com uma mensagem amigavel.
        return throwError(`CARREGAR: ${msg}`);
      }));
  }

  getCategories(): Observable<Category[] | null> {
    return this.http.get<Category[]>(`${environment.api}/v1/key/categories`)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.accountService.clear();
          this.router.navigateByUrl("/login");
          return throwError(`TOKEN: Token Inválido`);
        }
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
          msg = JSON.stringify(error.error.status)
          console.error(
            `Código do erro ${error.status}, ` +
            `Erro: ${JSON.stringify(error.error)}`);
        }
        // retornar um observable com uma mensagem amigavel.
        return throwError(`CARREGAR: ${msg}`);
      }));
  }

  readById(id: number) {
    return this.http.get<Key>(`${environment.api}/v1/key/${id}`)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.accountService.clear();
          this.router.navigateByUrl("/login");
          return throwError(`TOKEN: Token Inválido`);
        }
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
          msg = JSON.stringify(error.error.status)
          console.error(
            `Código do erro ${error.status}, ` +
            `Erro: ${JSON.stringify(error.error)}`);
        }
        // retornar um observable com uma mensagem amigavel.
        return throwError(`SHOW: ${msg}`);
      }));

  }

  update(key: Key): Observable<Key> {
    return this.http.put<Key>(`${environment.api}/v1/key/${key.id}`, key)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.accountService.clear();
          this.router.navigateByUrl("/login");
          return throwError(`TOKEN: Token Inválido`);
        }
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
          msg = JSON.stringify(error.error.status)
          console.error(
            `Código do erro ${error.status}, ` +
            `Erro: ${JSON.stringify(error.error)}`);
        }
        // retornar um observable com uma mensagem amigavel.
        return throwError(`UPDATE: ${msg}`);
      }));
  }

  save(key: Key): Observable<Key> {
    return this.http.post<Key>(`${environment.api}/v1/key`, key)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.accountService.clear();
          this.router.navigateByUrl("/login");
          return throwError(`TOKEN: Token Inválido`);
        }
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
          msg = JSON.stringify(error.error.status)
          console.error(
            `Código do erro ${error.status}, ` +
            `Erro: ${JSON.stringify(error.error)}`);
        }
        // retornar um observable com uma mensagem amigavel.
        return throwError(`STORE: ${msg}`);
      }));
  }

  deleteKey(id: number): Observable<unknown> {
    return this.http.delete(`${environment.api}/v1/key/${id}`)
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.accountService.clear();
          this.router.navigateByUrl("/login");
          return throwError(`TOKEN: Token Inválido`);
        }
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
          msg = JSON.stringify(error.error.status)
          console.error(
            `Código do erro ${error.status}, ` +
            `Erro: ${JSON.stringify(error.error)}`);
        }
        // retornar um observable com uma mensagem amigavel.
        return throwError(`DELETE: ${msg}`);
      }));
  }
}
