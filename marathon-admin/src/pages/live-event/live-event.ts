import {Component} from '@angular/core';
import {ModalController} from 'ionic-angular';
import firebase from 'firebase';

import {ParticipantsPage} from '../participants/participants';

@Component({
  selector: 'page-live-event',
  templateUrl: 'live-event.html',
})
export class LiveEventPage {
  eventData: any;
  isListed: boolean = false;
  participants: any = [];
  userPoints: any = [];

  constructor(private modalCtrl: ModalController) {
    new Promise((resolve, reject) => {
      return firebase.database().ref('events').orderByChild('eventStatus').limitToFirst(1).equalTo('started').on('child_added', snapshot => {
        if (snapshot.val() != null) {
          this.isListed = true;
          this.eventData = {
            id: snapshot.ref.key,
            name: snapshot.val().name,
            time: snapshot.val().time,
            date: snapshot.val().date,
            description: snapshot.val().description,
            location: snapshot.val().location,
            status: snapshot.val().eventStatus
          };
        }
        resolve(this.eventData);
      })
    }).then(event => {
      let eventData = {
        id: event.id,
      };

      firebase.database().ref('userCoords/' + eventData.id).on('child_added', datasnapshot => {
        firebase.database().ref('userCoords/' + eventData.id + '/' + datasnapshot.ref.key).child('coordinates').limitToLast(1).on('child_added', coordsnapshot => {
          this.userPoints.push({
            id: datasnapshot.ref.key,
            coordinatesId: coordsnapshot.ref.key,
            coordinates: coordsnapshot.val()
          });
          alert(this.userPoints);
        })
      });
    });

    if (this.isListed) {
      firebase.database().ref('participants/' + this.eventData.id).on('child_added', snapshot => {
        if (snapshot) {
          this.participants.push(snapshot.val());
        } else {
          this.participants = [];
        }
      })
    }
  }

  onOpenParticipants() {
    let modal = this.modalCtrl.create(ParticipantsPage, {event: this.eventData, participants: this.participants});
    modal.present();
  }

  getLastPoint() {
  }



}
