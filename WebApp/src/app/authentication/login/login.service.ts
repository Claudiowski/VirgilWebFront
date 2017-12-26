import { Injectable }    from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {

    constructor(private http: Http) { }

    public fetchToken(pseudo : string, passwd : string){
        let url = 'http://localhost:8080/api/token'
        let headers = new Headers()        
        headers.append('Credentials', pseudo + ':' + passwd)
        return this.http.get(url, { headers: headers })
                .toPromise()
                .then(response => { 
                    let token = response.text()
                    token = token.substr(1, token.length)
                    return token.substr(0, token.length-2)
                 })
    }
}