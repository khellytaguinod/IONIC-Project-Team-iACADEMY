import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EndPointPage } from './end-point';

@NgModule({
  declarations: [
    EndPointPage,
  ],
  imports: [
    IonicPageModule.forChild(EndPointPage),
  ],
})
export class EndPointPageModule {}
