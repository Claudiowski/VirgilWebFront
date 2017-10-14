import { Component, OnInit } from '@angular/core';
import { ReviewService } from './review.service'


@Component({
    selector: 'review',
    templateUrl: 'review.component.html',
    styleUrls: ['review.component.css']
})
export class ReviewComponent implements OnInit {

    categories : Object[] = []
    themes : Object[] = []

    navbarClass : string = "closedNav" 

    selectedThemes : Object[] = []
    selectedCategories : Object[] = []

    private favorites : Object[] = []
    
    constructor(private _reviewService : ReviewService) { }

    ngOnInit() { 
        this.fetchFavorites()
        this.fetchThemes()        
    }

    private fetchFavorites() {
        this._reviewService.fetchFavorites()
                .then(data => this.favorites = data )
    }

    openNav() {    
        this.navbarClass = "openNav"
    }

    private fetchThemes() {
        this._reviewService.fetchThemesByReader()
                .then(data => this.themes = data )
    }

    private fetchCategoriesByTheme(theme : Object, checkbox_state : boolean) {
        if (checkbox_state == true) {
            this._reviewService.fetchCategoriesByTheme(theme['id'])
                .then(data => this.categories = this.categories.concat(data) ) 
        } else {
            this.removeCategoriesByTheme(theme)
        }
    }

    private removeCategoriesByTheme(theme) {
        let c = this.categories
        let index = 0        
        for (let i = 0; i < c.length; i++) {
            if (c[i]['id_theme'] == theme['id']) {
                index = c.indexOf(c[i])
                c.splice(index, 1)
            }
        }
    }

    private removeSelectedCategoriesByTheme(theme) {
        let sc = this.selectedCategories
        let index = 0   
        for (let i = 0; i < sc.length; i++) {
            if (sc[i]['id_theme'] == theme['id']) {
                index = sc.indexOf(sc[i])
                sc.splice(index, 1)
            }
        }
    }

    private addThemeToChosenList(theme, box_checked)  {
        let index = 0
        if (box_checked) {
            this.selectedThemes.push(theme)
        } else {
            let index = this.selectedThemes.indexOf(theme)
            this.selectedThemes.splice(index, 1)
            this.removeCategoriesByTheme(theme)
            this.removeSelectedCategoriesByTheme(theme)           
        }
    }

    private addCategoryToChosenList(category, box_checked) {
        if (box_checked) {
            this.selectedCategories.push(category)
        } else {
            let index = this.selectedCategories.indexOf(category)
            this.selectedCategories.splice(index, 1)
        }
    }

    closeNav() {
        this.navbarClass = "closedNav"
        this.favorites = []
        if (this.selectedCategories.length == 0 && this.selectedThemes.length == 0) {
            this.fetchFavorites()
        } else {
            let themes = this.getThemesToFetch()
            this._reviewService.fetchChosenFavorites(themes, this.selectedCategories)
                .subscribe(data => {
                    this._reviewService.fetchChosenFavorites(themes, this.selectedCategories)
                        .subscribe(data => {
                            this.favorites= this.favorites.concat(data)
                    })
                }
            )
        }
    }

    private getThemesToFetch() {
        const c = this.selectedCategories
        const t = this.selectedThemes
        let themes = []        
        if (c.length == 0) {
            return t
        }
        for (let i = 0; i < t.length; i++) {
            for (let j = 0; j < c.length; j++) {
                if (t[i]['id'] == c[j]['id_theme']) 
                    break
                if (j+1 == c.length)
                    themes.push(t[i])
            }
        }
        return themes
    }
}