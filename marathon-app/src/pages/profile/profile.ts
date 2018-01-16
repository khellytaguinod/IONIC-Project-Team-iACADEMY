import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EventPage } from '../event/event';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  settingsPage = SettingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  onLoad(page: any) {
    this.navCtrl.push(this.settingsPage);
  }

}
