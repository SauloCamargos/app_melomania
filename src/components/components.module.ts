import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { BallsDisplayComponent } from './balls-display/balls-display';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [BallsDisplayComponent],
	imports: [		
		CommonModule,
		IonicModule
	],
	exports: [BallsDisplayComponent]
})
export class ComponentsModule {}
