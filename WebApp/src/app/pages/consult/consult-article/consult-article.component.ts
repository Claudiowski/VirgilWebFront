import { Component, OnInit, Input } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'

import { ConsultArticleService } from './consult-article.service'

import { Observable } from 'rxjs/Observable'

@Component({
    selector: 'consult-article',
    templateUrl: 'consult-article.component.html',
    styleUrls: ['consult-article.component.css']
})
export class ConsultArticleComponent implements OnInit { 

    @Input() private article : Object

    constructor(private _consultArticleService : ConsultArticleService) { }

    ngOnInit() { }

    private sendArticleToFavorites(article : Object) {
        this._consultArticleService.sendArticleToFavorites(article)
    }
}