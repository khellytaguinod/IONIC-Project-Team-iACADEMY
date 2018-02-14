import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { EventPage } from '../event/event';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  constructor(private navCtrl: NavController, private viewCtrl: ViewController, public locationTracker: LocationTrackerProvider) {}

  onClose() {
    this.viewCtrl.dismiss();
  }

  onStop() {
    this.navCtrl.setRoot(EventPage);
  }

}
