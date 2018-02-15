import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';
import { EventPage } from '../event/event';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
  name;
  imgPath;
  default = 'http://www.precision-spine.com/wp-content/uploads/2015/09/person-icon.png';

  constructor(private viewCtrl: ViewController, public locationTracker: LocationTrackerProvider, private authService: AuthService) {}

  ionViewWillEnter() {
    this.authService.getUserDetails();
    this.name = this.authService.username;
    this.imgPath = (this.authService.photoURL) ? this.authService.photoURL : this.default;
  }

  onClose() {
    this.viewCtrl.dismiss({mode: 'close'});
  }

  onStop() {
    this.viewCtrl.dismiss({mode: 'stop'});
  }

}
