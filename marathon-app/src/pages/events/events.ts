import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {EventPage} from '../event/event';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  sort: string = 'Latest';

  constructor(private alertCtrl: AlertController, private navCtrl: NavController) {
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
        text: 'OK',
        handler: data => {
          this.sort = data;
        }
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
