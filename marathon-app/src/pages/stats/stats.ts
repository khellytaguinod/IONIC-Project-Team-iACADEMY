import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { EventPage } from '../event/event';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  name;

  constructor(private navCtrl: NavController, private viewCtrl: ViewController, public locationTracker: LocationTrackerProvider, private authService: AuthService) {}

  ionViewWillEnter() {
    this.authService.getUserDetails();
    this.name = this.authService.username;
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

  onStop() {
    this.navCtrl.setRoot(EventPage);
  }

}
