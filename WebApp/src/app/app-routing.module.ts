import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }         from './app.component';
import { ConsultComponent }     from './pages/consult/consult.component';
import { ManageComponent }      from './pages/manage/manage.component';
import { ReviewComponent }      from './pages/review/review.component';
import { PageNotFoundComponent }      from './pages/page-not-found/page-not-found.component';

import { CanActivateViaAuthGuard } from './authentication/activation';
import { LoginComponent }       from './authentication/login/login.component';

const routes: Routes = [ 
  { path: '',           redirectTo: '/consult',        pathMatch: 'full' },
  { path: 'consult',    component: ConsultComponent,   canActivate:  [CanActivateViaAuthGuard] },
  { path: 'manage',     component: ManageComponent,    canActivate:  [CanActivateViaAuthGuard] },
  { path: 'review',     component: ReviewComponent,    canActivate:  [CanActivateViaAuthGuard] },
  { path: 'login',      component: LoginComponent },
  { path: '**',         component: PageNotFoundComponent, canActivate:  [CanActivateViaAuthGuard]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}