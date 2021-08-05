import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from './category';
import { CategoryRequest } from './categoryRequest';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
    })
};

@Injectable()
export class CategoryService {

    constructor(
        private http: HttpClient
    ) {}


    getCategories(page: number = 1, size: number = 4, parentId : number): Observable<CategoryRequest | null> {
        return this.http.get<CategoryRequest>(`${environment.api}/categories?page=${page}&size=${size}&parentId=${parentId}`)
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

    getMains(): Observable<Category[]| null> {
        return this.http.get<Category[]>(`${environment.api}/categories/mains`)
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

    readById(id: number) {
        return this.http.get<Category>(`${environment.api}/categories/${id}`)
        //.pipe(catchError(this.handleError('category.getById', null)))

    }

    update(category: Category): Observable<Category> {
        return this.http.put<Category>(`${environment.api}/categories/${category.id}`, category)
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

    save(category: Category): Observable<Category> {
        return this.http.post<Category>(`${environment.api}/categories`, category)
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

    deleteCategory(id: number): Observable<unknown> {
        return this.http.delete(`${environment.api}/categories/${id}`)
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

        //.pipe(catchError(this.handleError('deleteCategory', id)))
    }

    /* GET heroes whose name contains search term */
    /* searchHeroes(term: string): Observable<Hero[]> {
        term = term.trim();

        // Add safe, URL encoded search parameter if there is a search term
        const options = term ?
            { params: new HttpParams().set('name', term) } : {};

        return this.http.get<Hero[]>(this.heroesUrl, options)
            .pipe(
                catchError(this.handleError<Hero[]>('searchHeroes', []))
            );
    } */

    //////// Save methods //////////

    /** POST: add a new hero to the database */
    /* addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
            .pipe(
                catchError(this.handleError('addHero', hero))
            );
    } */

    /** DELETE: delete the hero from the server */


    /** PUT: update the hero on the server. Returns the updated hero upon success. */
    /* updateHero(hero: Hero): Observable<Hero> {
        httpOptions.headers =
            httpOptions.headers.set('Authorization', 'my-new-auth-token');

        return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
            .pipe(
                catchError(this.handleError('updateHero', hero))
            );
    } */
}