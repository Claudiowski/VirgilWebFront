import { NgModule }       from '@angular/core'
import { CommonModule } from '@angular/common';

import { CanActivateViaAuthGuard } from '../../authentication/activation'
import { AuthService } from '../../authentication/auth.service'

import { ConsultComponent }    from './consult.component'
import { ConsultService }  from './consult.service'

import { ConsultArticleComponent } from './consult-article/consult-article.component'
import { ConsultArticleService } from './consult-article/consult-article.service'


@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        ConsultComponent,
        ConsultArticleComponent
    ],
    providers: [ 
        ConsultService,
        ConsultArticleService
    ]
})
export class ConsultModule {}