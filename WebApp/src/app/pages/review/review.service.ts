import { Component, Injectable } from '@angular/core'
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http'

import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ReviewService {

  constructor(private http : Http) { }

    private getIdReader() {
        return jwt_decode(sessionStorage.getItem('token'))['id']
    }

    private getToken() {
        return sessionStorage.getItem('token')
    }

    private httpGetMethod(url : string) {
        let headers = new Headers()
        headers.append('Authorization', this.getToken())
        return this.http.get(url, new RequestOptions({ headers: headers }))
                        .toPromise().then(response => { return response.json() })    
    }    
  
    public fetchAllFavorites() {
        let url = 'http://localhost:8080/api/reader/' + this.getIdReader() + '/favorites'
        return this.httpGetMethod(url);
    }

    public fetchAllThemes() {
        let url = 'http://localhost:8080/api/reader/' + this.getIdReader() + '/themes'
        return this.httpGetMethod(url)
    }

    public fetchFavoritesByCategories(id_categories : number[]) {
        let url = 'http://localhost:8080/api/favorites?_categories='

        for (let i = 0; i < id_categories.length; i++)
            url += id_categories[i] + ','

        url = url.substring(0,url.length-1)

        return this.httpGetMethod(url)
    }

    public fetchFavoritesByThemes(id_themes : number[]) {
        let url = 'http://localhost:8080/api/favorites?_themes='

        for (let i = 0; i < id_themes.length; i++)
            url += id_themes[i] + ','

        url = url.substring(0, url.length-1)

        return this.httpGetMethod(url)
    }

    public fetchFavoritesByThemesAndCats(theme_list : number[], cat_list : number[]) : Observable<any> {
            return new Observable(observer => {
                this.fetchFavoritesByCategories(cat_list)
                    .then(data => {
                        observer.next(data)
                        this.fetchFavoritesByThemes(theme_list)
                            .then(data => {
                                observer.next(data)
                                observer.complete()
                        })
                })  
            })
     }
}
  
