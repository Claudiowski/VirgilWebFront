import { Component, OnInit, Injectable } from '@angular/core'
import { Headers, Http, RequestOptions } from '@angular/http'

import * as jwt_decode from 'jwt-decode';

@Injectable()
export class AddStreamService {

    constructor(private http : Http) { }

    public fetchThemes() {
        let token = sessionStorage.getItem('token')
        let id_reader = jwt_decode(token)['id']
        let headers = new Headers()
        let url = 'http://localhost:8080/api/reader/' + id_reader + '/themes'
        return this.http.get(url, new RequestOptions({ headers: headers }))
                        .toPromise()
                        .then(response => { 
                            return response.json() })
    }

    public fetchCategories(id_theme : number) : Promise<Object[]> {
        let headers = new Headers()
        let url = 'http://localhost:8080/api/theme/' + id_theme + '/categories'
        return this.http.get(url, new RequestOptions({ headers: headers }))
                .toPromise()
                .then(response => { return response.json() })
    }

    public sendNewTheme(name : string) {
        alert("fdp")
        let token = sessionStorage.getItem('token')
        let id_reader = jwt_decode(token)['id']
        let headers = new Headers()
        let params = {"name": name, "id_reader": id_reader }
        let url = 'http://localhost:8080/api/themes'
        headers.append('Authorization', token)
        this.http.post(url, params, new RequestOptions({ headers: headers }))
                 .toPromise()
                 .then(response => { return response.json() })
    }

    public sendNewCateg(name : string, id_theme : number){
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let url = 'http://localhost:8080/api/categories'
        headers.append('Authorization', token)
        let params = {"name": name, "id_theme": id_theme }        
        this.http.post(url, params, new RequestOptions({ headers: headers }))
                 .toPromise()
                 .then(response => { return response.json() })
    }

    public sendNewStream(name : string, str_url : string, id_categ : number){
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let url = 'http://localhost:8080/api/streams'
        headers.append('Authorization', token)  
        let params = {"name": name, "url": str_url, "id_category": id_categ }                
        this.http.post(url, params, new RequestOptions({ headers: headers }))
                 .toPromise()
                 .then(response => { return response.json() })
    }
}
