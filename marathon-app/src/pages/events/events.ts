import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {EventPage} from '../event/event';
import firebase from "firebase";

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  events: any = [];

  constructor(private alertCtrl: AlertController, private navCtrl: NavController) {
  }

  ionViewWillEnter() {
    firebase.database().ref('events').on('child_added', snapshot => {
      this.events.push(snapshot.val());
    });
  }

  openSortBy() {
    const alert = this.alertCtrl.create({
      title: 'Sort By',
      inputs: [{
        type: 'radio',
        label: 'Latest',
        value: 'Latest',
        checked: true
      }, {
        type: 'radio',
        label: 'Name',
        value: 'Name'
      }],
      buttons: [{
        text: 'OK'
      }, {
        text: 'Cancel'
      }]
    });
    alert.present();
  }

  onOpenEvent() {
    this.navCtrl.push(EventPage)
  }

}
