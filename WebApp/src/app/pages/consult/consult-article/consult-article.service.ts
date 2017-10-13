import { Injectable } from '@angular/core'
import { Http, RequestOptions, URLSearchParams } from '@angular/http'

import {Observable} from 'rxjs/Rx';

import * as jwt_decode from 'jwt-decode';

@Injectable()
export class ConsultArticleService {
  
    constructor(private http: Http) { }

    public sendArticleToFavorites(article : Object) {
        console.log(article)
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let params = new URLSearchParams()
        let url = 'http://localhost:8080/favorites'
        headers.append('Authorization', token)
        params.append('url', ''+article['link'])
        params.append('annotation', '')
        params.append('id_stream', article['stream']['id'])
        params.append('title', ''+article['title'])
        params.append('description', ''+article['description'])
        params.append('date_hour', ''+article['pubDate'])
        this.http.post(url, params, new RequestOptions(headers))
                 .toPromise()
                 .then(response => { return response.json() },
                       error => console.log('fdp'))
    }
}