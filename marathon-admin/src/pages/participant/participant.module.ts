import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParticipantPage } from './participant';

@NgModule({
  declarations: [
    ParticipantPage,
  ],
  imports: [
    IonicPageModule.forChild(ParticipantPage),
  ],
})
export class ParticipantPageModule {}
