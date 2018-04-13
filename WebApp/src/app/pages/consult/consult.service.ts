import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions } from '@angular/http'

import * as jwt_decode from 'jwt-decode';

import { Observable } from 'rxjs/Observable'


@Injectable()
export class ConsultService {

    private rssToJsonServiceBaseUrl: string = 'https://rss2json.com/api.json?rss_url='
    private streams : Object[]
    private articles : Object[]

    constructor(private http : Http) { 
        this.streams = []
        this.articles = []
    }

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

    public fetchAllArticles() {
        let url = 'http://localhost:8080/api/reader/' + this.getIdReader() + '/articles'
        return this.httpGetMethod(url)
    }

    public fetchAllThemes() {
        let url = 'http://localhost:8080/api/reader/' + this.getIdReader() + '/themes'
        return this.httpGetMethod(url)
    }

    public fetchArticlesByCategories(id_categories : number[]) {
        let url = 'http://localhost:8080/api/articles?_categories='

        for (let i = 0; i < id_categories.length; i++)
            url += id_categories[i] + ','

        url = url.substring(0,url.length-1)

        return this.httpGetMethod(url)
    }

    public fetchArticlesByThemes(id_themes : number[]) {
        let url = 'http://localhost:8080/api/articles?_themes='

        for (let i = 0; i < id_themes.length; i++)
            url += id_themes[i] + ','

        url = url.substring(0, url.length-1)

        return this.httpGetMethod(url)
    }

    public fetchArticlesByThemesAndCats(theme_list : number[], cat_list : number[]) : Observable<any> {
        return new Observable(observer => {
            this.fetchArticlesByCategories(cat_list)
                .then(data => {
                    observer.next(data)
                    this.fetchArticlesByThemes(theme_list)
                        .then(data => {
                            observer.next(data)
                            observer.complete()
                        })   
            })         
        })
    }
}