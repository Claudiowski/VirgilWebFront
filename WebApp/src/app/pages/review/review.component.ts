import { Component, OnInit } from '@angular/core';
import { ReviewService } from './review.service'


@Component({
    selector: 'review',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.css']
})
export class ReviewComponent implements OnInit {

    private favorites : Object[]
    
    constructor(private _reviewService : ReviewService) { }

    ngOnInit() { 
        this.fetchFavorites()
    }

    private fetchFavorites() {
        this._reviewService.fetchFavorites()
                .then(data => this.favorites = data )
    }
}