import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StartPointPage } from './start-point';

@NgModule({
  declarations: [
    StartPointPage,
  ],
  imports: [
    IonicPageModule.forChild(StartPointPage),
  ],
})
export class StartPointPageModule {}
