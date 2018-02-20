import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {Storage} from "@ionic/storage";
import firebase from 'firebase';

import { ConnectivityService } from '../../services/connectivity';
import { NoConnectionPage } from '../no-connection/no-connection';

@Component({
  selector: 'page-change-frequency',
  templateUrl: 'change-frequency.html',
})
export class ChangeFrequencyPage {
  private offline;
  frequency;
  interval;
  id = firebase.auth().currentUser.uid;


  constructor(private navParams: NavParams, private storage: Storage, private connectivity: ConnectivityService, private navCtrl: NavController) {
    storage.get(this.id).then(val => {
      this.interval = val;
    })
  }

  ionViewWillEnter() {
    this.offline = this.connectivity.isOffline().subscribe(data => {
      this.navCtrl.push(NoConnectionPage);
    });
  }

  ionViewWillLeave() {
    this.offline.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.frequency = form.value.frequency;
    this.navParams.get('resolve')(this.frequency);
  }

}
