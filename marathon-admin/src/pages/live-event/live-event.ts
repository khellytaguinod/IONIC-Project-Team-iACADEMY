import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import firebase from 'firebase';

import { ParticipantsPage } from '../participants/participants';

@Component({
  selector: 'page-live-event',
  templateUrl: 'live-event.html',
})
export class LiveEventPage {
  eventData;
  isListed: boolean = false;
  participants: any = [];

  constructor(private modalCtrl: ModalController) {
    firebase.database().ref('events')
      .orderByChild('eventStatus')
      .limitToFirst(1)
      .equalTo('started').on('child_added', snapshot => {
        if(snapshot.val() != null) {
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
      });
    if(this.isListed) {
      firebase.database().ref('participants/' + this.eventData.id).on('child_added', snapshot => {
        if(snapshot) {
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

}
