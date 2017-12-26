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

    public fetchThemesByReader() {
        let token = sessionStorage.getItem('token')
        let id_reader = jwt_decode(token)['id']
        let headers = new Headers()
        let url = 'http://localhost:8080/api/reader/' + id_reader + '/themes'
        headers.append('Authorization', token)
        return this.http.get(url, new RequestOptions({headers: headers}))
                        .toPromise()
                        .then(response => { 
                            if (response.status == 200)
                                return response.json()
                            else
                                return null })
    }

    public fetchStreamsByReader() {
        let token = sessionStorage.getItem('token')
        let id_reader = jwt_decode(token)['id']
        let headers = new Headers()
        let url = 'http://localhost:8080/api/reader/' + id_reader + '/streams'
        headers.append('Authorization', token)
        return this.http.get(url, new RequestOptions({headers: headers}))
                        .toPromise()
                        .then(response => { 
                            if (response.status == 200)
                                return response.json()
                            else
                                return null })
    }

    public fetchCategoriesByTheme(id_theme : string) {
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let url = 'http://localhost:8080/api/theme/' + id_theme + '/categories'
        headers.append('Authorization', token)
        return this.http.get(url, new RequestOptions({headers: headers}))
                        .toPromise()
                        .then(response => {                             
                        if (response.status == 200)
                            return response.json()
                        else
                            return null })
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
        let url = 'http://localhost:8080/api/theme/' + id_theme + '/streams'
        headers.append('Authorization', token)
        return this.http.get(url,  new RequestOptions({headers: headers}))
                        .toPromise()
                        .then(response => { 
                        if (response.status == 200)
                            return response.json()
                        else
                            return null })
    }

    public fetchStreamsByThemes(id_themes: number[]) {
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let params = {}
        let url = 'http://localhost:8080/api/streams?_themes='
        for (let i = 0; i < id_themes.length; i++)
            url += id_themes[i] + ','
        url = url.substring(0,url.length-1)
        console.log(url)
        headers.append('Authorization', token)
        headers.append('Content-Type', 'application/json')        
        params = { 'id_themes': id_themes }
        return this.http.post(url, new RequestOptions({headers: headers}))
                        .toPromise()
                        .then(response => { 
                        if (response.status == 200)
                            return response.json()
                        else
                            return null })
    }

    public fetchStreamsByCategory(id_category : number) {
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let url = 'http://localhost:8080/api/category' + id_category + '/streams'
        headers.append('Authorization', token)
        return this.http.post(url, new RequestOptions({headers: headers}))
                        .toPromise()
                        .then(response => { 
                        if (response.status == 200)
                            return response.json()
                        else
                            return null }) 
    }

    public fetchStreamsByCategories(id_categories : number[]) {
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let url = 'http://localhost:8080/streams?_categories='
        for (let i = 0; i < id_categories.length; i++)
            url += id_categories[i] + ','
        url = url.substring(0,url.length-1)
        console.log(url)
        headers.append('Authorization', token)
        headers.append('Content-Type', 'application/json')
        return this.http.post(url, new RequestOptions({headers: headers}))
                        .toPromise()
                        .then(response => { 
                        if (response.status == 200)
                            return response.json()
                        else
                            return null })
    }

    public fetchChosenStreams(theme_list : Object[], cat_list : Object[]) : Observable<any> {
        let id_themes = []
        let id_categories = []

        for (let i = 0; i < theme_list.length; i++) 
            id_themes.push(theme_list[i]['id'])

        for (let i = 0; i < cat_list.length; i++)
            id_categories.push(cat_list[i]['id'])

        return new Observable(observer => {
            if (id_categories.length > 0 && id_themes.length > 0) {
                this.fetchStreamsByCategories(id_categories)
                    .then(data => {
                        observer.next(data)
                        this.fetchStreamsByThemes(id_themes)
                            .then(data => {
                                observer.next(data)
                                observer.complete()
                            })   
                })
            } else if (id_categories.length > 0 && id_themes.length == 0) {
                this.fetchStreamsByCategories(id_categories)
                    .then(data => { observer.next(data); observer.complete() } )
            } else if (id_themes.length > 0 && id_categories.length == 0) {
                this.fetchStreamsByThemes(id_themes)
                    .then(data => { observer.next(data); observer.complete() } )
            }
        })
    }     

    private getFeedContent(url : string): Promise<Object[]> {
        return this.http.get(this.rssToJsonServiceBaseUrl + url)
                .toPromise().then(res => { return res.json()['items'] })
    }
}