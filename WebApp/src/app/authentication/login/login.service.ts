import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

    private url : string

    constructor(private http: Http) { 
        this.url = 'http://localhost:8080/auth/token'
    }

    public fetchToken(pseudo : string, passwd : string){
        let params = new URLSearchParams()
        params.append('pseudo', pseudo)
        params.append('password', passwd)
        return this.http.post(this.url, params)
                .toPromise()
                .then(response => { 
                    let token = response.text()
                    token = token.substr(1, token.length)
                    return token.substr(0, token.length-2)
                 })
    }

    private formatHeaders() {
        let headers = new Headers()
        headers.append('Content-Type', 'application/json')
        return headers
    }
}