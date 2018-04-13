import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions } from '@angular/http'

import {Observable} from 'rxjs/Rx';

import * as jwt_decode from 'jwt-decode';

@Injectable()
export class ConsultArticleService {
  
    constructor(private http: Http) { }

    private getIdReader() {
        return jwt_decode(sessionStorage.getItem('token'))['id']
    }

    private getToken() {
        return sessionStorage.getItem('token')
    }

    private httpPostMethod(url : string, params : Object) {
        let headers = new Headers()
        headers.append('Authorization', this.getToken())
        return this.http.post(url, params, new RequestOptions({ headers: headers }))
                        .toPromise().then(response => { return response.json() })    
    }

    public sendArticleToFavorites(article : Object) {
        let params = {}
        let url = 'http://localhost:8080/api/favorites'
        params['url'] = '' + article['url']
        params['annotation'] = ''
        params['id_stream'] = article['stream']['id']
        params['title'] = '' + article['title']
        params['description'] = '' + article['description']
        params['publication_date'] = '' + article['publication_date']
        return this.httpPostMethod(url, params)
    }
}