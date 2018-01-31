import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import 'rxjs/Rx';

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html',
})
export class ParticipantsPage implements OnInit {
  eventData;
  participants;
  participantsList = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.initializeItems();
  }

  ngOnInit() {
    this.eventData = this.navParams.get('event');
    this.participants = this.navParams.get('participants');
    this.participants.map(participant => {
      this.participantsList.push(participant.name);
    })
  }

  initializeItems() {
    this.participantsList;
  }

  getItems(ev) {
    this.initializeItems();
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.participantsList = this.participantsList.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
