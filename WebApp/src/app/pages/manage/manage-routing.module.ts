import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddStreamComponent }    from './add-stream/add-stream.component';
import { RemoveStreamComponent } from './remove-stream/remove-stream.component'

import { CanActivateViaAuthGuard } from '../../authentication/activation';
import { LoginComponent }       from '../../authentication/login/login.component';

const manageRoutes: Routes = [
  { path: 'manage/add', component: AddStreamComponent, canActivate: [CanActivateViaAuthGuard] },
  { path: 'manage/remove', component: RemoveStreamComponent, canActivate: [CanActivateViaAuthGuard] },
];

@NgModule({
  imports: [
    RouterModule.forChild(manageRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ManageRoutingModule { }