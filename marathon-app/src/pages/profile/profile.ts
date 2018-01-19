import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SettingsPage } from '../settings/settings';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  username;
  email;
  settingsPage = SettingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authService: AuthService) {}

  ionViewWillEnter() {
    this.onGetUserDetails();
  }

  onLoad(page: any) {
    this.navCtrl.push(this.settingsPage);
  }

  onGetUserDetails() {
    this.authService.getUserDetails();
    this.username = this.authService.username;
    this.email = this.authService.email;

  }

}
