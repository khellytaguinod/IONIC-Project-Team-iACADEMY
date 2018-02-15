import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChangePhotoPage } from './change-photo';

@NgModule({
  declarations: [
    ChangePhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(ChangePhotoPage),
  ],
})
export class ChangePhotoPageModule {}
