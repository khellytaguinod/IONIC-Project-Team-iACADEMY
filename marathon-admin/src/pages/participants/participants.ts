import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html',
})
export class ParticipantsPage implements OnInit {
  eventData;
  participants;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {}

  ngOnInit() {
    this.eventData = this.navParams.get('event');
    this.participants = this.navParams.get('participants');
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
