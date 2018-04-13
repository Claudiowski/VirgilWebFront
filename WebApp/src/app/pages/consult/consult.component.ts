import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params }    from '@angular/router'

import { ConsultService } from './consult.service'


@Component({
    selector: 'consult',
    templateUrl: 'consult.component.html',
    styleUrls: ['consult.component.css']
})
export class ConsultComponent implements OnInit {   

    navbarClass : string = "closedNav"

    currentArticles : Object[] = []
    currentThemes : Object[] = []

    themes : Object []

    constructor( private _consultService : ConsultService,
                 private route: ActivatedRoute,
                 private router : Router ) { }
    
    ngOnInit() { 
        this._consultService.fetchAllArticles().then(articles => this.currentArticles = this.tryGetCurrentArticles(articles) )
        this._consultService.fetchAllThemes().then(themes => this.currentThemes = themes )
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

    checkEntity(entity : Object) {
        entity['is_checked'] = !entity['is_checked']
    }

    openNav() {    
        this.navbarClass = "openNav"
    }

    closeNav() {
        this.navbarClass = "closedNav"
        let selectedThemesAndCats = this.getSelectedThemesAndCats()
        let localArticles = []

        if (selectedThemesAndCats[0].length > 0 && selectedThemesAndCats[1].length > 0) 
        {
            this._consultService.fetchArticlesByThemesAndCats(selectedThemesAndCats[0], selectedThemesAndCats[1])
                                .subscribe(
                                articles => 
                                { 
                                    if (articles) 
                                        localArticles = localArticles.concat(articles)
                                 },
                                 error => 
                                 { 
                                     
                                 },
                                 () => 
                                 {
                                    this.currentArticles = this.tryGetCurrentArticles(localArticles)
                                 }
                                )
        } 
        else if (selectedThemesAndCats[0].length > 0) 
        {
            this._consultService.fetchArticlesByThemes(selectedThemesAndCats[0])
                                .then(articles => this.currentArticles = this.tryGetCurrentArticles(articles) )        
        } 
        else if (selectedThemesAndCats[1].length > 0) 
        {
            this._consultService.fetchArticlesByCategories(selectedThemesAndCats[1])
                                .then(articles => this.currentArticles = this.tryGetCurrentArticles(articles) )          
        } 
        else 
        {
            this._consultService.fetchAllArticles().then(articles => this.tryGetCurrentArticles(articles) )            
        }
    }

    tryGetCurrentArticles(articles) {
        return articles != null ? articles.sort(this.sortByPubDate) : null  
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
