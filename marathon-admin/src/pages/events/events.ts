import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { EventPage } from '../event/event';
import { EditEventPage } from '../edit-event/edit-event';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

  constructor(private alertCtrl: AlertController, private navCtrl: NavController) {}

  onSort() {
    let alert = this.alertCtrl.create({
      title: 'Sort By',
      inputs: [{
          type: 'radio',
          label: 'Latest',
          value: 'latest',
          checked: true
        }, {
          type: 'radio',
          label: 'Name',
          value: 'name'
        }],
      buttons: [{
          text: 'Ok'
        }, {
          text: 'Cancel'
        }]
    });
    alert.present();
  }

  onOpenEvent() {
    this.navCtrl.push(EventPage);
  }

  onAddEvent() {
    this.navCtrl.push(EditEventPage, {mode: 'add'});
  }

}
