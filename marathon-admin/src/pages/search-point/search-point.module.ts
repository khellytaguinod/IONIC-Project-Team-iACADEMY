import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPointPage } from './search-point';

@NgModule({
  declarations: [
    SearchPointPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPointPage),
  ],
})
export class SearchPointPageModule {}
