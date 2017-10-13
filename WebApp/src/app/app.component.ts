import { Component } from '@angular/core'
import { AuthService } from './authentication/auth.service'

import { LoginComponent }   from './authentication/login/login.component'
import { ConsultComponent } from './pages/consult/consult.component'
import { ManageComponent } from './pages/manage/manage.component'
import { ReviewComponent } from './pages/review/review.component'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private _authService : AuthService){ }
}
