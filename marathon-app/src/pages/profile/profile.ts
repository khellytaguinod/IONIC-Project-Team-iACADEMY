import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { AuthService } from '../../services/auth';
import { ConnectivityService } from '../../services/connectivity';
import { NoConnectionPage } from '../no-connection/no-connection';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private offline;
  username;
  email;
  imgPath;
  settingsPage = SettingsPage;
  default = 'http://www.precision-spine.com/wp-content/uploads/2015/09/person-icon.png';

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService, private connectivity: ConnectivityService) {}

  ionViewWillEnter() {
    this.onGetUserDetails();
    this.offline = this.connectivity.isOffline().subscribe(data => {
      this.navCtrl.push(NoConnectionPage);
    });
  }

  ionViewWillLeave() {
    this.offline.unsubscribe();
  }

  onLoad(page: any) {
    this.navCtrl.push(this.settingsPage);
  }

  onGetUserDetails() {
    this.authService.getUserDetails();
    this.username = this.authService.username;
    this.email = this.authService.email;
    this.imgPath = (this.authService.photoURL) ? this.authService.photoURL : this.default;
  }

}
