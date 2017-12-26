import { Component }  from '@angular/core';
import { Router } from '@angular/router'

import { LoginService } from './login.service';

@Component({
  selector:    'login',
  templateUrl: './login.component.html',
  styleUrls:   ['./login.component.css']
})
export class LoginComponent {

    private pseudo   : string
    private password : string
    
    constructor(private _loginService : LoginService, private router : Router){ }

    submitLogin() {
      this._loginService.fetchToken(this.pseudo, this.password)
                        .then(data => { 
                            sessionStorage.setItem('token', data)
                            console.log(data)
                            this.router.navigateByUrl('') })
    }

    resetForm() {
      this.pseudo = '';
      this.password = '';
    }
}