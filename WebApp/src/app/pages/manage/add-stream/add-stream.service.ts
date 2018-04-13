import { Component, OnInit, Injectable } from '@angular/core'
import { Headers, Http, RequestOptions } from '@angular/http'

import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AddStreamService {

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

    private httpPostMethod(url : string, params : Object) {
        let headers = new Headers()
        headers.append('Authorization', this.getToken())
        return this.http.post(url, params, new RequestOptions({ headers: headers }))
                        .toPromise().then(response => { return response.json() })    
    }

    public fetchThemes() {
        let url = 'http://localhost:8080/api/reader/' + this.getIdReader() + '/themes'
        return this.httpGetMethod(url)
    }

    public sendNewTheme(name : string) {
        let params = {"name": name, "id_reader": this.getIdReader() }
        let url = 'http://localhost:8080/api/themes'
        this.httpPostMethod(url, params)
    }

    public sendNewCateg(name : string, id_theme : number){
        let url = 'http://localhost:8080/api/categories'
        let params = {"name": name, "id_theme": id_theme }        
        this.httpPostMethod(url, params)
    }

    public sendNewStream(name : string, str_url : string, id_categ : number){
        let url = 'http://localhost:8080/api/streams'
        let params = {"name": name, "url": str_url, "id_category": id_categ }                
        this.httpPostMethod(url, params)        
    }
}
