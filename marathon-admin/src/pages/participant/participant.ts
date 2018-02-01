import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-participant',
  templateUrl: 'participant.html',
})
export class ParticipantPage implements OnInit {
  eventData;
  participant;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {}

  ngOnInit() {
    this.eventData = this.navParams.get('event');
    this.participant = this.navParams.get('participant');
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
