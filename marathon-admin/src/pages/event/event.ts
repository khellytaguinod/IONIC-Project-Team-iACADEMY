import {Component} from '@angular/core';
import {AlertController, NavParams, NavController} from 'ionic-angular';
import {EditEventPage} from '../edit-event/edit-event';
import firebase from 'firebase';
import { LiveEventPage } from '../live-event/live-event';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  eventData: any = {};
  event: string;
  participants: any = [];
  checkpoint = 'All';
  joined = [1];
  displayTime;
  displayDate

  constructor(private alertCtrl: AlertController, public navParams: NavParams, private navCtrl: NavController) {
    this.eventData = this.navParams.get('event');
    this.displayDate = new Date(this.eventData.date).toDateString();
    this.displayTime = this.convertTime(this.eventData.time);
    firebase.database().ref('participants/' + this.eventData.id).on('child_added', snapshot => {
      this.participants.push(snapshot.val());
    });
  }

  ionViewWillEnter() {
    this.event = 'details';
  }

  onEditEvent() {
    this.navCtrl.push(EditEventPage, {mode: 'edit', data: this.eventData});
  }

  onSelect() {
    let alert = this.alertCtrl.create({
      title: 'Checkpoints',
      inputs: [{
        type: 'radio',
        label: 'All',
        value: 'All',
        checked: true
      }, {
        type: 'radio',
        label: 'Checkpoint 1',
        value: 'Checkpoint 1'
      }, {
        type: 'radio',
        label: 'Checkpoint 2',
        value: 'Checkpoint 2'
      }, {
        type: 'radio',
        label: 'Checkpoint 3',
        value: 'Checkpoint 3'
      }, {
        type: 'radio',
        label: 'Checkpoint 4',
        value: 'Checkpoint 4'
      }],
      buttons: [{
        text: 'Ok',
        handler: data => {
          this.checkpoint = data;
          console.log(this.checkpoint);
        }
      }]
    });
    alert.present();
  }

  onStartEvent() {
    this.navCtrl.push(LiveEventPage, {event: this.eventData, participants: this.participants});
  }

  private convertTime(time: string) {
    let H = +time.substr(0, 2);
    let h = (H % 12) || 12;
    let ampm = H < 12 ? "AM" : "PM";
    return h + time.substr(2, 3) + ' ' + ampm;
  }

}
