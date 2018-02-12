import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  constructor(private viewCtrl: ViewController, public locationTracker: LocationTrackerProvider) {}

  onClose() {
    this.viewCtrl.dismiss();
  }

  stop() {
    this.locationTracker.stopTracking();
  }

}
