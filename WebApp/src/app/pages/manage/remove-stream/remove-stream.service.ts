import { Component, Injectable } from '@angular/core'
import { Http, URLSearchParams, RequestOptions } from '@angular/http'

import * as jwt_decode from 'jwt-decode'

@Injectable()
export class RemoveStreamService {

  constructor(private http : Http) {}

  public fetchAllStreams(){
    let token = sessionStorage.getItem('token')
    let id_reader = jwt_decode(token)['id']    
    let headers = new Headers()
    let params = new URLSearchParams()
    let url = 'http://localhost:8080/complete-stream-by-reader'
    headers.append('Authorization', token)
    params.append('id_reader', ''+id_reader)    
    return this.http.post(url, params, new RequestOptions(headers))
            .toPromise()
            .then(response => { return response.json() })
  }

  public removeStream(id : number) {
    let token = sessionStorage.getItem('token')
    let headers = new Headers()
    let params = new URLSearchParams()
    let url = 'http://localhost:8080/streams/' + id
    headers.append('Authorization', token)
    return this.http.delete(url, new RequestOptions(headers))
            .toPromise()
            .then(response => { return response.json() })
  }

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
}
