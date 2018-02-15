import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import firebase from 'firebase';

import {EventPage} from '../event/event';
import {EditEventPage} from '../edit-event/edit-event';
import { NoConnectionPage } from '../no-connection/no-connection';
import { ConnectivityService } from '../../services/connectivity';

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {
  data;
  events: any = [];
  isListed: boolean;
  default = 'https://cdn.barnimages.com/wp-content/uploads/2017/03/2017-03-27-roman-drits-barnimages-009-768x512.jpg';

  constructor(private navCtrl: NavController, private connectivity: ConnectivityService) {
    firebase.database().ref('events').orderByChild('date').on('child_added', snapshot => {
      if (snapshot.val() != null) {
        this.isListed = true;
        this.events.push({
          id: snapshot.ref.key,
          name: snapshot.val().name,
          time: snapshot.val().time,
          displayTime: this.convertTime(snapshot.val().time),
          date: snapshot.val().date,
          displayDate: new Date(snapshot.val().date).toDateString(),
          description: snapshot.val().description,
          startPoint: snapshot.val().startPoint,
          endPoint: snapshot.val().endPoint,
          imgPath: (snapshot.val().imgPath) ? snapshot.val().imgPath : this.default,
          status: snapshot.val().eventStatus
        });
      } else {
        this.isListed = false;
      }
    });
  }

  ionViewWillEnter() {
    this.connectivity.isOffline().subscribe(data => {
      console.log(data);
      this.navCtrl.push(NoConnectionPage);
    });
    this.connectivity.isOnline().subscribe(data => {
      console.log(data);
      this.navCtrl.popToRoot();
    })
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
