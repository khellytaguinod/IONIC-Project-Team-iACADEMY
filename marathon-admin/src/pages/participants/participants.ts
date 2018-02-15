import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController, ModalController } from 'ionic-angular';
import { ParticipantPage } from '../participant/participant';

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html',
})
export class ParticipantsPage implements OnInit {
  eventData;
  participants;

  constructor(public navParams: NavParams, public viewCtrl: ViewController, public modalCtrl: ModalController) {}

  ngOnInit() {
    this.eventData = this.navParams.get('event');
    this.participants = this.navParams.get('participants');
  }

  onOpenParticipant(participant) {
    let modal = this.modalCtrl.create(ParticipantPage, {event: this.eventData, participant});
    modal.present();
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
