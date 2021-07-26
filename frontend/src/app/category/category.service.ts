import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Category } from './category';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'my-auth-token'
    })
};

const PROTOCOL = "http";
const PORT = 4000;

@Injectable()
export class CategoryService {
    baseUrl: string;
    //heroesUrl = 'api/heroes';  // URL to web api
    private handleError: HandleError;

    constructor(
        private http: HttpClient,
        httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('CategoryService');
        this.baseUrl = `${PROTOCOL}://${location.hostname}:${PORT}/`;
    }

    /** GET heroes from the server */
    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.baseUrl + "categories")
            .pipe(
                catchError(this.handleError('getCategories', []))
            );
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
    deleteCategory(id: number): Observable<unknown> {
        const url = `${this.baseUrl + "categories"}/${id}`; // DELETE api/heroes/42
        return this.http.delete(url, httpOptions)
            .pipe(
                catchError(this.handleError('deleteCategory'))
            );
    }

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


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/