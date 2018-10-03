import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { BallsDisplayComponent } from './balls-display/balls-display';
import { CommonModule } from '@angular/common';
import { CreatAccountMoipComponent } from './creat-account-moip/creat-account-moip';
@NgModule({
	declarations: [BallsDisplayComponent,
    CreatAccountMoipComponent],
	imports: [		
		CommonModule,
		IonicModule
	],
	exports: [BallsDisplayComponent,
    CreatAccountMoipComponent]
})
export class ComponentsModule {}
