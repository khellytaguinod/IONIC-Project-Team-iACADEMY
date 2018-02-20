import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConnectivityService } from '../../services/connectivity';

@Component({
  selector: 'page-no-connection',
  templateUrl: 'no-connection.html',
})
export class NoConnectionPage {
  private online;

  constructor(public navCtrl: NavController, public navParams: NavParams, private connectivity: ConnectivityService) {}

  ionViewWillEnter() {
    this.online = this.connectivity.isOnline().subscribe(data => {
      this.navCtrl.popToRoot();
    });
  }

  ionViewWillLeave() {
    this.online.unsubscribe();
  }

}
