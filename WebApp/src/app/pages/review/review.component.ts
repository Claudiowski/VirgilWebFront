import { Component, OnInit } from '@angular/core';
import { ReviewService } from './review.service'


@Component({
    selector: 'review',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.css']
})
export class ReviewComponent implements OnInit {

    navbarClass : string = "closedNav" 

    currentFavorites : Object[] = []
    currentThemes : Object[] = []
    
    constructor(private _reviewService : ReviewService) { }

    ngOnInit() { 
        this.fetchFavorites()
        this._reviewService.fetchAllThemes().then(themes => this.currentThemes = themes )
        this.checkablesThemesAndCats()      
    }

    checkablesThemesAndCats() {
        for (let i = 0; i < this.currentThemes.length; i++){
            this.currentThemes[i]['is_checked'] = false

            for (let j = 0; j < this.currentThemes[i]['categories'].length; j++){
                this.currentThemes[i]['categories'][j]['is_checked'] = false
            }
        }
    }

    private fetchFavorites() {
        this._reviewService.fetchAllFavorites()
                .then(data => this.currentFavorites = data.sort(this.sortByPubDate) )
    }

    openNav() {    
        this.navbarClass = "openNav"
    }

    private fetchThemes() {
        this._reviewService.fetchAllThemes()
                .then(data => this.currentThemes = data )
    }


    checkEntity(entity : Object) {
        entity['is_checked'] = !entity['is_checked']
    }

    closeNav() {
        this.navbarClass = "closedNav"
        let localFavorites = []
        let selectedThemesAndCats = this.getSelectedThemesAndCats()

        if (selectedThemesAndCats[0].length > 0 && selectedThemesAndCats[1].length > 0) {
            this._reviewService.fetchFavoritesByThemesAndCats(selectedThemesAndCats[0], selectedThemesAndCats[1])
                                .subscribe(
                                    favorites => 
                                    {
                                        if (favorites)
                                            localFavorites.concat(favorites) 
                                    },
                                    error =>
                                    {

                                    },
                                    () =>
                                    {
                                        this.currentFavorites = this.tryGetCurrentFavorites(localFavorites)                                       
                                    }
                                )
        } else if (selectedThemesAndCats[0].length > 0) {
            this._reviewService.fetchFavoritesByThemes(selectedThemesAndCats[0])
                                .then(favorites => this.currentFavorites = this.tryGetCurrentFavorites(favorites)  )   
        } else if (selectedThemesAndCats[1].length > 0) {
            this._reviewService.fetchFavoritesByCategories(selectedThemesAndCats[1])
                                .then(favorites => this.currentFavorites = this.tryGetCurrentFavorites(favorites) )            
        } else {
            this.fetchFavorites()
        }
    }

    tryGetCurrentFavorites(favorites) {
        return favorites != null ? favorites.sort(this.sortByPubDate) : null  
    }

    getSelectedThemesAndCats() {
        let selectedThemes = []
        let selectedCategories = []

        for (let i = 0; i < this.currentThemes.length; i++) {
            let themeIsAddable = true            
            let theme = this.currentThemes[i]

            for (let j = 0; j < theme['categories'].length; j++) {
                if (theme['categories'][j]['is_checked']) {
                    selectedCategories.push(theme['categories'][j]['id'])
                    themeIsAddable = false
                }
            }
            if (themeIsAddable && theme['is_checked'])
                selectedThemes.push(theme['id'])        
        }
        return [selectedThemes, selectedCategories]
    }

    private sortByPubDate(a : Object[], b : Object[]) : number {
        return new Date(b['publication_date']).getTime() - new Date(a['publication_date']).getTime()
    }
}