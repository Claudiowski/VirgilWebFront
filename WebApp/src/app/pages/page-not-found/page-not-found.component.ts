import { Component } from '@angular/core'
import { AuthService } from '../../authentication/auth.service'

@Component({
  selector: 'page-not-found',
  templateUrl: './page-not-found.component.html'
})
export class PageNotFoundComponent {

    constructor(private _authService : AuthService){ }
}
