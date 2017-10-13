import { Component, Injectable } from '@angular/core'
import { Http, URLSearchParams, RequestOptions } from '@angular/http'

import * as jwt_decode from 'jwt-decode';


@Injectable()
export class ReviewService {

  constructor(private http : Http) { }
  
  public fetchFavorites() {
    let token = sessionStorage.getItem('token')
    let id_reader = jwt_decode(token)['id']
    let headers = new Headers()
    let params = new URLSearchParams()
    let url = 'http://localhost:8080/favorite-by-reader'
    headers.append('Authorization', token)
    params.append('id_reader', id_reader)
    return this.http.post(url, params, new RequestOptions(headers))
                    .toPromise()
                    .then(response => { 
                        return response.json() })
  }
}
