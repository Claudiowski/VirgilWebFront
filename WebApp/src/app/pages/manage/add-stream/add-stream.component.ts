import { Component, OnInit } from '@angular/core';

import  { AddStreamService } from './add-stream.service'

@Component({
  selector: 'app-add-stream',
  templateUrl: './add-stream.component.html',
  styleUrls: ['./add-stream.component.css']
})
export class AddStreamComponent implements OnInit {

  private categsByTheme
  private themes : Object []

  constructor(private _addStreamService : AddStreamService) { }

    ngOnInit() { 
        this.initThemes()
    }

    private initThemes() {
        this._addStreamService.fetchThemes()
                .then(data => this.themes = data)
    }

    private initCategsByTheme(id_theme : number) {
        this._addStreamService.fetchCategories(id_theme)
                .then(data => this.categsByTheme = data)
    }

    private sendNewStream(title : string, url: string, id_categ : number) {
        this._addStreamService.sendNewStream(title, url, id_categ)
    }

    private sendNewTheme(theme : string) {
        this._addStreamService.sendNewTheme(theme)
    }

    private sendNewCateg(categ : string, id_theme : number){
        this._addStreamService.sendNewCateg(categ, id_theme)
    }
}
