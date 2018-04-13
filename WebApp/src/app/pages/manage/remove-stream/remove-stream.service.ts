import { Component, Injectable } from '@angular/core'
import { Http, Headers, RequestOptions } from '@angular/http'

import * as jwt_decode from 'jwt-decode'

@Injectable()
export class RemoveStreamService {

  constructor(private http : Http) {}

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

  private httpPutMethod(url : string, params : Object) {
      let headers = new Headers()
      headers.append('Authorization', this.getToken())
      return this.http.put(url, params, new RequestOptions({ headers: headers }))
                      .toPromise().then(response => { return response.json() })    
  }

  private httpDeleteMethod(url : string) {
    let headers = new Headers()
    headers.append('Authorization', this.getToken())
    return this.http.delete(url, new RequestOptions({ headers: headers }))
                    .toPromise().then(response => { return response.json() })    
  }

  public fetchStreamsByReader(){
    let url = 'http://localhost:8080/api/reader/' + this.getIdReader() + '/streams'
    return this.httpGetMethod(url)
  }

  public removeStream(id : number) {
    let url = 'http://localhost:8080/api/streams/' + id
    return this.httpDeleteMethod(url)
  }

  public fetchThemes() {
    let url = 'http://localhost:8080/api/reader/' + this.getIdReader() + '/themes'
    return this.httpGetMethod(url)
  }

  public removeTheme(id : number) {
    let url = 'http://localhost:8080/api/reader/' + id
    return this.httpDeleteMethod(url)
  }


  public editStream(id : number, title : string, str_url : string, category : number) {
    let url = 'http//localhost:8080/api/streams/' + id
    let params = {}
    if (str_url != null) params['url'] = str_url
    if (title != null) params['name'] = title
    if (category != null) params['id_category'] = category
    return this.httpPutMethod(url, params)
  }
}
