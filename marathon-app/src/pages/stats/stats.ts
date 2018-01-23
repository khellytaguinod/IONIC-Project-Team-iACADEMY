import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  constructor(private viewCtrl: ViewController) {}

  onClose() {
    this.viewCtrl.dismiss();
  }

}
