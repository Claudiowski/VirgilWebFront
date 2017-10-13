import { Component, OnInit } from '@angular/core'
import { ManageService } from './manage.service'

@Component({
    selector: 'manage',
    templateUrl: 'manage.component.html',
    styleUrls: ['manage.component.css']
})
export class ManageComponent {
    
    constructor(private _manageService : ManageService) { 

    }
}