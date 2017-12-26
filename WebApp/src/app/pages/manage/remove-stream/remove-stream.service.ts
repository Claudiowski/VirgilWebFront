import { Component, Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'

import * as jwt_decode from 'jwt-decode'

@Injectable()
export class RemoveStreamService {

  constructor(private http : Http) {}

  public fetchStreamsByReader(){
    let token = sessionStorage.getItem('token')
    let id_reader = jwt_decode(token)['id']    
    let headers = new Headers()
    let url = 'http://localhost:8080/api/reader/' + id_reader + '/streams'
    headers.append('Authorization', token)
    return this.http.get(url, new RequestOptions({ headers: headers }))
            .toPromise()
            .then(response => { return response.json() })
  }

  public removeStream(id : number) {
    let token = sessionStorage.getItem('token')
    let headers = new Headers()
    let url = 'http://localhost:8080/api/streams/' + id
    headers.append('Authorization', token)
    return this.http.delete(url, new RequestOptions({ headers: headers }))
            .toPromise()
            .then(response => { return response.json() })
  }

  public fetchThemes() {
    let token = sessionStorage.getItem('token')
    let id_reader = jwt_decode(token)['id']
    let headers = new Headers()
    let url = 'http://localhost:8080/api/reader/' + id_reader + '/themes'
    headers.append('Authorization', token)
    return this.http.get(url, new RequestOptions({ headers: headers }))
                    .toPromise()
                    .then(response => { return response.json() })
}

  public fetchCategories(id_theme : number) : Promise<Object[]> {
    let headers = new Headers()
    let url = 'http://localhost:8080/api/theme/' + id_theme + '/categories'
    headers.append('Authorization', sessionStorage.getItem('token'))
    return this.http.get(url, new RequestOptions({ headers: headers }))
            .toPromise()
            .then(response => { return response.json() })
  }
}
