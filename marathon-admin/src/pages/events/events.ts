import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import firebase from 'firebase';

import {EventPage} from '../event/event';
import {EditEventPage} from '../edit-event/edit-event';


@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  events: any = [];
  isListed: boolean = false;
  default = 'https://cdn.barnimages.com/wp-content/uploads/2017/03/2017-03-27-roman-drits-barnimages-009-768x512.jpg';

  constructor(private navCtrl: NavController) {
    firebase.database().ref('events').orderByChild('date').on('child_added', snapshot => {
      if(snapshot.val() != null) {
        this.isListed = true;
        this.events.push({
          id: snapshot.ref.key,
          name: snapshot.val().name,
          time: snapshot.val().time,
          displayTime: this.convertTime(snapshot.val().time),
          date: snapshot.val().date,
          displayDate: new Date(snapshot.val().date).toDateString(),
          description: snapshot.val().description,
          location: snapshot.val().location,
          imgPath: (snapshot.val().imgPath) ? snapshot.val().imgPath : this.default,
          status: snapshot.val().eventStatus
        });
      }
    });
  }

  onOpenEvent(event) {
    this.navCtrl.push(EventPage, {event});
  }

  onAddEvent() {
    this.navCtrl.push(EditEventPage, {mode: 'add'});
  }

  private convertTime(time: string) {
    let H = +time.substr(0, 2);
    let h = (H % 12) || 12;
    let ampm = H < 12 ? "AM" : "PM";
    return h + time.substr(2, 3) + ' ' + ampm;
  }
}
