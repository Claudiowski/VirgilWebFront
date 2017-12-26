import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions } from '@angular/http'

import {Observable} from 'rxjs/Rx';

import * as jwt_decode from 'jwt-decode';

@Injectable()
export class ConsultArticleService {
  
    constructor(private http: Http) { }

    public sendArticleToFavorites(article : Object) {
        console.log(article)
        let token = sessionStorage.getItem('token')
        let headers = new Headers()
        let params = {}
        let url = 'http://localhost:8080/favorites'
        headers.append('Authorization', token)
        params['url'] = '' + article['link']
        params['annotation'] = ''
        params['id_stream'] = article['stream']['id']
        params['title'] = '' + article['title']
        params['description'] = '' + article['description']
        params['publication_date'], '' + article['pubDate']
        this.http.post(url, params, new RequestOptions({ headers: headers }))
                 .toPromise()
                 .then(response => { return response.json() } )
    }
}