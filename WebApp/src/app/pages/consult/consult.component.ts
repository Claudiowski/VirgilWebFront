import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params }    from '@angular/router'

import { ConsultService } from './consult.service'


@Component({
    selector: 'consult',
    templateUrl: 'consult.component.html',
    styleUrls: ['consult.component.css']
})
export class ConsultComponent implements OnInit {

    categories : Object[] = []
    themes : Object[] = []
    articles : Object[] = []

    defaultStreams : Object[] = []
    chosenStreams : Object[] = []    

    navbarClass : string = "closedNav" 

    selectedThemes : Object[] = []
    selectedCategories : Object[] = []

    constructor( private _consultService : ConsultService,
                 private route: ActivatedRoute,
                 private router : Router ) {
    }
    
    ngOnInit() {
        this.fetchAllStreams().then(data => this.fetchArticles(data))
        this.fetchThemes()
    }

    private fetchAllStreams() {
        return this._consultService.fetchStreamsByReader()
                .then(data => this.defaultStreams = data )
    }

    private fetchThemes() {
        this._consultService.fetchThemesByReader()
                .then(data => this.themes = data )
    }

    private fetchArticles(streams : Object[]) {
        let articles = []
        let stream_index = 0
        this._consultService.fetchAndSortArticles(streams)
            .subscribe(data => {
                           for (let i = 0; i < data.length; i++) {
                               data[i]['stream'] = streams[stream_index]
                           }
                           articles = articles.concat(data)
                           stream_index++
                       },
                       error => console.log('error'),
                       () => { this.articles = articles.sort(this.sortByPubDate); console.log(this.articles)} )
    }

    private fetchCategoriesByTheme(theme : Object, checkbox_state : boolean) {
        if (checkbox_state == true) {
            this._consultService.fetchCategoriesByTheme(theme['id'])
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

    private sortByPubDate(a, b){
        return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
    }

    openNav() {    
        this.navbarClass = "openNav"
    }

    closeNav() {
        this.navbarClass = "closedNav"
        this.articles = []
        this.chosenStreams = []
        if (this.selectedCategories.length == 0 && this.selectedThemes.length == 0) {
            this.fetchArticles(this.defaultStreams)             
        } else {
            let themes = this.getThemesToFetch()
            this._consultService.fetchChosenStreams(themes, this.selectedCategories)
                .subscribe(data => {
                    this.chosenStreams = this.chosenStreams.concat(data)
                    this.fetchArticles(this.chosenStreams)
                })
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
