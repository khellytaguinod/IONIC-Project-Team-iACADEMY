import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LiveEventPage } from './live-event';

@NgModule({
  declarations: [
    LiveEventPage,
  ],
  imports: [
    IonicPageModule.forChild(LiveEventPage),
  ],
})
export class LiveEventPageModule {}
