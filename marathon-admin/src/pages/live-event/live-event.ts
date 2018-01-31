import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';
import { ParticipantsPage } from '../participants/participants';

@Component({
  selector: 'page-live-event',
  templateUrl: 'live-event.html',
})
export class LiveEventPage implements OnInit {
  eventData;
  participants;

  constructor(private navParams: NavParams, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.eventData = this.navParams.get('event');
    this.participants = this.navParams.get('participants');
    // console.log(this.eventData, this.participants);
  }

  onOpenParticipants() {
    let modal = this.modalCtrl.create(ParticipantsPage, {event: this.eventData, participants: this.participants});
    modal.present();
  }

}
