import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewComponent } from './review.component'
import { ReviewService } from './review.service'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ReviewComponent
  ],
  providers: [
    ReviewService
  ]
})
export class ReviewModule { }
