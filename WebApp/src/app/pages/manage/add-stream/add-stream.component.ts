import { Component, OnInit } from '@angular/core';

import  { AddStreamService } from './add-stream.service'

@Component({
  selector: 'app-add-stream',
  templateUrl: './add-stream.component.html',
  styleUrls: ['./add-stream.component.css']
})
export class AddStreamComponent implements OnInit {

  private themes : Object []
  private categsByTheme : Object[];

  constructor(private _addStreamService : AddStreamService) { }

    ngOnInit() { 
        this.initThemes()
    }

    private initThemes() {
        this._addStreamService.fetchThemes()
                .then(data => { this.themes = data })
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

    private choseCategsByTheme(theme_id : number) {
        for (let i = 0; i < this.themes.length; i++) {
            if (this.themes[i]['id'] == theme_id) {
                this.categsByTheme = this.themes[i]['categories']
            }
        }
    }
}
