import { Injectable } from '@angular/core'
import { Http, URLSearchParams, RequestOptions } from '@angular/http'

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

    public fetchThemesByReader() {
        let token = sessionStorage.getItem('token')
        let id_reader = jwt_decode(token)['id']
        let headers = new Headers()
        let params = new URLSearchParams()
        let url = 'http://localhost:8080/theme-by-reader'
        headers.append('Authorization', token)
        params.append('id_reader', id_reader)
        return this.http.post(url, params, new RequestOptions(headers))
                        .toPromise()
                        .then(response => { 
                            return response.json() })
    }

    public fetchStreamsByReader() {
        let token = sessionStorage.getItem('token')
        let id_reader = jwt_decode(token)['id']
        let headers = new Headers()
        let params = new URLSearchParams()
        let url = 'http://localhost:8080/complete-stream-by-reader'
        headers.append('Authorization', token)
        params.append('id_reader', id_reader)
        return this.http.post(url, params, new RequestOptions(headers))
                        .toPromise()
                        .then(response => { 
                            return response.json() })
    }

    public fetchCategoriesByTheme(id_theme : string) {
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let params = new URLSearchParams()
        let url = 'http://localhost:8080/category-by-theme-id'
        headers.append('Authorization', token)
        params.append('id_theme', id_theme)
        return this.http.post(url, params, new RequestOptions(headers))
                        .toPromise()
                        .then(response => { 
                            return response.json() })
    }

    public fetchAndSortArticles(streams : Object[]) : Observable<Object[]> {
        let articles = []
        return new Observable(observer => {
            for (let i = 0; i < streams.length; i++) {
                this.getFeedContent(streams[i]['url'])
                    .then(data => { 
                        observer.next(data) 
                        if (i == streams.length-1) observer.complete()
                    })
            }
        })
    }

    public fetchStreamsByTheme(id_theme: number) {
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let params = new URLSearchParams()
        let url = 'http://localhost:8080/stream-by-theme-id'
        headers.append('Authorization', token)
        params.append('id_theme', ''+id_theme)
        return this.http.post(url, params, new RequestOptions(headers))
                        .toPromise()
                        .then(response => { 
                            return response.json() })
    }

    public fetchStreamsByCategory(id_category : number) {
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let params = new URLSearchParams()
        let url = 'http://localhost:8080/stream-by-category'
        headers.append('Authorization', token)
        params.append('id_category', ''+id_category)
        return this.http.post(url, params, new RequestOptions(headers))
                        .toPromise()
                        .then(response => { 
                            return response.json() })
    }

    public fetchChosenStreams(theme_list : Object[], cat_list : Object[]) {
        let url = 'http://localhost:8080/stream-by-category'
        //this.http.get
    }

    private getFeedContent(url : string): Promise<Object[]> {
        return this.http.get(this.rssToJsonServiceBaseUrl + url)
                .toPromise().then(res => { return res.json()['items'] })
    }
}