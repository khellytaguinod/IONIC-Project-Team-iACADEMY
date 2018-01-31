import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import firebase from 'firebase';

import {MapPage} from '../map/map';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  buttonIcon: string;
  buttonColor: string;
  joined: boolean;
  event: any = {};
  id;
  date;
  name;
  time;
  status;
  location;
  description;

  constructor(private navCtrl: NavController) {
    firebase.database().ref('events/').on('child_added', snapshot => {
      this.event = snapshot.val();
      if (this.event.eventStatus === 'started') {
        this.id = snapshot.ref.key;
        this.date = this.event.date;
        this.name = this.event.name;
        this.time = this.event.time;
        this.location = this.event.location;
        this.status = this.event.eventStatus;
        this.description = this.event.description;
      } else if (this.event.eventStatus === 'incoming') {
        this.id = snapshot.ref.key;
        this.date = this.event.date;
        this.name = this.event.name;
        this.time = this.event.time;
        this.location = this.event.location;
        this.status = this.event.eventStatus;
        this.description = this.event.description;
      }
    });
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('participants/').child(this.id).once('value', snapshot=> {
      console.log(snapshot.val())
    })
    // firebase.database().ref('participants/' + this.id).once('value').then(snapshot => {
    //   if (snapshot.hasChild(userId)) {
    //     console.log(snapshot.val());
    //     // this.joined = false;
    //     // this.buttonIcon = "add";
    //     // this.buttonColor = 'danger';
    //   } else {
    //     firebase.database().ref('participants/' + this.id).child(userId).once('value', dataSnapshot => {
    //       console.log(dataSnapshot.val());
    //       // this.joined = dataSnapshot.val().joined;
    //       // if (this.joined) {
    //       //   this.buttonIcon = "checkmark";
    //       //   this.buttonColor = 'default';
    //       // } else {
    //       //   this.buttonIcon = "add";
    //       //   this.buttonColor = 'danger';
    //       // }
    //     });
    //   }
    // })
  }

  onViewRoute() {
    this.navCtrl.push(MapPage, {mode: 'view'}).catch(error => {
      console.log(error);
    });
  }

  onUserEventStatus() {
    let user = firebase.auth().currentUser;
    if (this.buttonIcon === 'add') {
      this.buttonIcon = "checkmark";
      this.buttonColor = 'default';
      firebase.database().ref('/participants').child(this.id + '/' + user.uid).set({
        joined: true,
        name: user.displayName
      }).catch(error => console.log(error));
    } else if (this.buttonIcon === 'checkmark') {
      this.buttonIcon = "add";
      this.buttonColor = 'danger';
      firebase.database().ref('/participants').child(this.id + '/' + user.uid).update({
        joined: false,
      });
    } else if (this.buttonIcon === 'checkmark' && this.status === 'started') {
      this.buttonIcon = "play";
      this.buttonColor = 'secondary';
      this.navCtrl.push(MapPage, {mode: 'join'}).catch(error => console.log(error));
    }
  }
}
