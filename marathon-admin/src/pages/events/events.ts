import {Component} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {EventPage} from '../event/event';
import {EditEventPage} from '../edit-event/edit-event';
import firebase from 'firebase';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  events: any = [];

  constructor(private alertCtrl: AlertController, private navCtrl: NavController) {
    firebase.database().ref('events').on('child_added', snapshot => {
      this.events.push({
        id: snapshot.ref.key,
        name: snapshot.val().name,
        time: snapshot.val().time,
        date: snapshot.val().date,
        description: snapshot.val().description,
        location: snapshot.val().location,
        status: snapshot.val().eventStatus
      });
    })
  }

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

  onOpenEvent(event) {
    this.navCtrl.push(EventPage, {event});
  }

  onAddEvent() {
    this.navCtrl.push(EditEventPage, {mode: 'add'});
  }

}
