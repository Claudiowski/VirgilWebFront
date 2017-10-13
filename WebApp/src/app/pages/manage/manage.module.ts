import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CanActivateViaAuthGuard } from '../../authentication/activation'
import { AuthService } from '../../authentication/auth.service'

import { ManageRoutingModule } from './manage-routing.module'

import { ManageComponent }  from './manage.component';
import { ManageService } from './manage.service'

import { AddStreamComponent } from './add-stream/add-stream.component'
import { AddStreamService } from './add-stream/add-stream.service'

import { RemoveStreamComponent } from './remove-stream/remove-stream.component'
import { RemoveStreamService } from './remove-stream/remove-stream.service'


@NgModule({
  imports: [
    ManageRoutingModule,
    CommonModule,
  ],
  declarations: [
    ManageComponent,
    AddStreamComponent,
    RemoveStreamComponent
  ],
  providers: [
    ManageService,
    AddStreamService,
    RemoveStreamService
  ]
})
export class ManageModule { }
