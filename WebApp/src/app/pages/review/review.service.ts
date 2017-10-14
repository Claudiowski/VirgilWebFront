import { Component, Injectable } from '@angular/core'
import { Http, URLSearchParams, RequestOptions } from '@angular/http'

import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class ReviewService {

  constructor(private http : Http) { }
  
    public fetchFavorites() {
      let token = sessionStorage.getItem('token')
      let id_reader = jwt_decode(token)['id']
      let headers = new Headers()
      let params = new URLSearchParams()
      let url = 'http://localhost:8080/favorite-by-reader'
      headers.append('Authorization', token)
      params.append('id_reader', id_reader)
      return this.http.post(url, params, new RequestOptions(headers))
                      .toPromise()
                      .then(response => { 
                          return response.json() })
    }

    public fetchFavoritesByThemes(id_themes) {
      let token = sessionStorage.getItem('token')
      let id_reader = jwt_decode(token)['id']
      let headers = new Headers()
      let params = {}
      let url = 'http://localhost:8080/favorite-by-theme-list'
      params = { 'id_themes': id_themes }      
      headers.append('Authorization', token)
      return this.http.post(url, params, new RequestOptions(headers))
                      .toPromise()
                      .then(response => { 
                          return response.json() })
    }

    public fetchFavoritesByCategories(id_categories) {
      let token = sessionStorage.getItem('token')
      let id_reader = jwt_decode(token)['id']
      let headers = new Headers()
      let params = {}
      let url = 'http://localhost:8080/favorite-by-category-list'
      params = { 'id_categories': id_categories }      
      headers.append('Authorization', token)
      return this.http.post(url, params, new RequestOptions(headers))
                      .toPromise()
                      .then(response => { 
                          return response.json() })
    }

    public fetchThemesByReader() {
      let token = sessionStorage.getItem('token')
      let id_reader = jwt_decode(token)['id']
      let headers = new Headers()
      let params = new URLSearchParams()
      let url = 'http://localhost:8080/theme-by-reader'
      headers.append('Authorization', token)
      params.append('id_reader', id_reader)
      return this.http.post(url, params, new RequestOptions(headers))
                      .toPromise()
                      .then(response => { 
                          return response.json() })
    }

    public fetchCategoriesByTheme(id_theme : string) {
      let token = sessionStorage.getItem('token')
      let headers = new Headers()
      let params = new URLSearchParams()
      let url = 'http://localhost:8080/category-by-theme-id'
      headers.append('Authorization', token)
      params.append('id_theme', id_theme)
      return this.http.post(url, params, new RequestOptions(headers))
                      .toPromise()
                      .then(response => { 
                          return response.json() })
  }

  public fetchChosenFavorites(theme_list, cat_list) {
    let id_themes = []
    let id_categories = []

    for (let i = 0; i < theme_list.length; i++) 
        id_themes.push(theme_list[i]['id'])

    for (let i = 0; i < cat_list.length; i++)
        id_categories.push(cat_list[i]['id'])

    return new Observable(observer => {
        if (id_categories.length > 0 && id_themes.length > 0) {
            this.fetchFavoritesByCategories(id_categories)
                .then(data => {
                    observer.next(data)
                    this.fetchFavoritesByThemes(id_themes)
                        .then(data => {
                            observer.next(data)
                            observer.complete()
                        })   
            })
        } else if (id_categories.length > 0 && id_themes.length == 0) {
            this.fetchFavoritesByCategories(id_categories)
                .then(data => { observer.next(data); observer.complete() } )
        } else if (id_themes.length > 0 && id_categories.length == 0) {
            this.fetchFavoritesByThemes(id_themes)
                .then(data => { observer.next(data); observer.complete() } )
        }
    })
  }
}
