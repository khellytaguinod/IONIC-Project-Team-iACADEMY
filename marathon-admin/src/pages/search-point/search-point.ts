import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-search-point',
  templateUrl: 'search-point.html',
})
export class SearchPointPage {
  point: string;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.point = this.navParams.get('point');
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
