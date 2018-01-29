import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import firebase from 'firebase';

import {MapPage} from '../map/map';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  date;
  name;
  description;
  location;
  status;
  time;
  event: any = {};

  constructor(private navCtrl: NavController) {
    firebase.database().ref('events/').on('child_added', snapshot => {
      this.event = snapshot.val();
      if (this.event.eventStatus === 'started') {
        this.date = this.event.date;
        this.name = this.event.name;
        this.time = this.event.time;
        this.location = this.event.location;
        this.description = this.event.description;
      } else if (this.event.eventStatus === 'incoming') {
        this.date = this.event.date;
        this.name = this.event.name;
        this.time = this.event.time;
        this.location = this.event.location;
        this.description = this.event.description;
      }
    })
  }

  onViewRoute() {
    this.navCtrl.push(MapPage, {mode: 'view'});
  }

  onJoinEvent() {
    this.navCtrl.push(MapPage, {mode: 'join'});
  }

}
