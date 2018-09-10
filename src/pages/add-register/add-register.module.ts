import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddRegisterPage } from './add-register';

@NgModule({
  declarations: [
    AddRegisterPage,
  ],
  imports: [
    ComponentsModule,
    IonicPageModule.forChild(AddRegisterPage),
  ],
})
export class AddRegisterPageModule {}
