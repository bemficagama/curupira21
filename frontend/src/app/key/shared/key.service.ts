import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Key } from './key';
import { KeyRequest } from './keyRequest';
import { Category } from 'src/app/category/shared/category';

@Injectable()
export class KeyService {

    constructor(
        private http: HttpClient
    ) {}

    getKeys(page: number = 1, size: number = 4, categoryId: number = 0, search: string = ''): Observable<KeyRequest | null> {
        return this.http.get<KeyRequest>(`${environment.api}/keys?page=${page}&size=${size}&categoryId=${categoryId}&search=${search}`)
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
                    msg = JSON.stringify(error.error.status)
                    console.error(
                        `Código do erro ${error.status}, ` +
                        `Erro: ${JSON.stringify(error.error)}`);
                }
                // retornar um observable com uma mensagem amigavel.
                return throwError(`CARREGAR: ${msg}`);
            }));
    }

    getCategories(): Observable<Category[]| null> {
        return this.http.get<Category[]>(`${environment.api}/keys/categories`)
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
                    msg = JSON.stringify(error.error.status)
                    console.error(
                        `Código do erro ${error.status}, ` +
                        `Erro: ${JSON.stringify(error.error)}`);
                }
                // retornar um observable com uma mensagem amigavel.
                return throwError(`CARREGAR CATEGORIAS: ${msg}`);
            }));
    }

    readById(id: number) {
        return this.http.get<Key>(`${environment.api}/keys/${id}`)
        //.pipe(catchError(this.handleError('category.getById', null)))

    }

    update(category: Key): Observable<Key> {
        return this.http.put<Key>(`${environment.api}/keys/${category.id}`, category)
            .pipe(catchError((error: HttpErrorResponse) => {

                if (error.error instanceof ErrorEvent) {
                    // Erro de client-side ou de rede
                    console.error('Ocorreu um erro:', error.error.message);
                } else {
                    // Erro retornando pelo backend
                    console.error(
                        `Código do erro ${error.status}, ` +
                        `Erro: ${JSON.stringify(error.error)}`);
                }
                // retornar um observable com uma mensagem amigavel.
                return throwError(`ATUALIZAR: ${JSON.stringify(error.error)}`);
            }));
    }

    save(category: Key): Observable<Key> {
        return this.http.post<Key>(`${environment.api}/keys`, category)
            .pipe(catchError((error: HttpErrorResponse) => {

                if (error.error instanceof ErrorEvent) {
                    // Erro de client-side ou de rede
                    console.error('Ocorreu um erro:', error.error.message);
                } else {
                    // Erro retornando pelo backend
                    console.error(
                        `Código do erro ${error.status}, ` +
                        `Erro: ${JSON.stringify(error.error)}`);
                }
                // retornar um observable com uma mensagem amigavel.
                return throwError(`SALVAR: ${JSON.stringify(error.error)}`);
            }));
    }

    deleteKey(id: number): Observable<unknown> {
        return this.http.delete(`${environment.api}/keys/${id}`)
            .pipe(catchError((error: HttpErrorResponse) => {

                if (error.error instanceof ErrorEvent) {
                    // Erro de client-side ou de rede
                    console.error('Ocorreu um erro:', error.error.message);
                } else {
                    // Erro retornando pelo backend
                    console.error(
                        `Código do erro ${error.status}, ` +
                        `Erro: ${JSON.stringify(error.error)}`);
                }
                // retornar um observable com uma mensagem amigavel.
                return throwError(`DELETE: ${JSON.stringify(error.error)}`);
                `Network Error: ${error.statusText} (${error.status})`
                throwError(`DELETE: ${error.statusText} ${JSON.stringify(error.error)} (Código do Erro: ${error.status})`)
            }));
    }
}