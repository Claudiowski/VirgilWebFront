import { Component, OnInit, Injectable } from '@angular/core'
import { Http, URLSearchParams, RequestOptions } from '@angular/http'

import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AddStreamService {

    constructor(private http : Http) { }

    public fetchThemes() {
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

    public fetchCategories(id_theme : number) : Promise<Object[]> {
        let headers = new Headers()
        let params = new URLSearchParams()
        let url = 'http://localhost:8080/category-by-theme-id'
        headers.append('Authorization', sessionStorage.getItem('token'))
        params.append('id_theme', ''+id_theme)
        return this.http.post(url, params, new RequestOptions(headers))
                .toPromise()
                .then(response => { return response.json() })
    }

    public sendNewTheme(theme : string) {
        alert("fdp")
        let token = sessionStorage.getItem('token')
        let id_reader = jwt_decode(token)['id']
        let headers = new Headers()
        let params = new URLSearchParams()
        let url = 'http://localhost:8080/themes'
        headers.append('Authorization', token)
        params.append('name', theme)
        params.append('id_reader', id_reader)
        this.http.post(url, params, new RequestOptions(headers))
                 .toPromise()
                 .then(response => { return response.json() })
    }

    public sendNewCateg(categ : string, id_theme : number){
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let params = new URLSearchParams()
        let url = 'http://localhost:8080/categories'
        headers.append('Authorization', token)  
        params.append('name', categ)
        params.append('id_theme', ''+id_theme)
        this.http.post(url, params, new RequestOptions(headers))
                 .toPromise()
                 .then(response => { return response.json() })
    }

    public sendNewStream(stream : string, stream_url : string, id_categ : number){
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let params = new URLSearchParams()
        let url = 'http://localhost:8080/streams'
        headers.append('Authorization', token)  
        params.append('name', stream)
        params.append('url', stream_url)
        params.append('id_category', ''+id_categ)
        this.http.post(url, params, new RequestOptions(headers))
                 .toPromise()
                 .then(response => { return response.json() })
    }
}
