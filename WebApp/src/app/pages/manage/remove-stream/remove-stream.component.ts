import { Component, OnInit } from '@angular/core';

import { RemoveStreamService } from './remove-stream.service'

@Component({
  selector: 'app-remove-stream',
  templateUrl: './remove-stream.component.html',
  styleUrls: ['./remove-stream.component.css']
})
export class RemoveStreamComponent implements OnInit {

  private streams : Object[]
  private editBool : boolean[]
  private indexActivatedEdit : number

  private themes : Object[]
  private categories : Object[]

  constructor(private _removeStreamService : RemoveStreamService) {
    this.editBool = []
    this.indexActivatedEdit = 0
  }

  ngOnInit() {
    this._removeStreamService.fetchAllStreams()
            .then(data => {
              this.streams = data
              for (let i = 0; i < this.streams.length; i++)
                this.editBool[i] = false
            })
    this._removeStreamService.fetchThemes()
            .then(data => this.themes = data)
  }

  private deleteStream(stream_id : number) {
    this._removeStreamService.removeStream(stream_id)
                             .then(data => this.fetchAllStreams())
  }

  private fetchAllStreams() {
    this._removeStreamService.fetchAllStreams()
              .then(data => this.streams = data)
  }

  private initCategsByTheme(id_theme : number) {
    this._removeStreamService.fetchCategories(id_theme)
            .then(data => this.categories = data)
  }

  private editStream(new_index : number) {
    if (this.editBool[new_index] == true) {
      this.editBool[new_index] = false
    } else {
      this.editBool[this.indexActivatedEdit] = false
      this.indexActivatedEdit = new_index
      this.editBool[new_index] = true
    }
  }
}
