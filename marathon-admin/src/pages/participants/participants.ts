import {Component, OnInit} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import * as firebase from "firebase/app";

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html',
})
export class ParticipantsPage implements OnInit {
  eventData;
  participants;

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.eventData = this.navParams.get('event');
    this.participants = this.navParams.get('participants');
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

  onFetchData(userId) {
    console.log('Working');

    firebase.database().ref('userCoords/' + this.eventData.id).child(userId).on('child_added', snapshot => {
      console.log(snapshot.val());
      
    })
  }
}
