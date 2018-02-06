import {Component} from '@angular/core';
import {NavParams, NavController, AlertController, ActionSheetController} from 'ionic-angular';
import firebase from 'firebase';

import {EditEventPage} from '../edit-event/edit-event';
import { LiveEventPage } from '../live-event/live-event';
import { EventsService } from '../../services/events';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  eventData: any = {};
  event: string;
  participants: any = [];
  buttonTitle: string;

  constructor(public navParams: NavParams, public navCtrl: NavController, private actionSheetCtrl: ActionSheetController, private eventsService: EventsService, public alertCtrl: AlertController) {
    this.eventData = this.navParams.get('event');
    firebase.database().ref('participants/' + this.eventData.id).on('child_added', snapshot => {
      if(snapshot) {
        this.participants.push(snapshot.val());
      } else {
        this.participants = [];
      }
    });
    this.buttonTitle = (this.eventData.status === 'started') ? 'live preview' : 'start event';
  }

  ionViewWillEnter() {
    this.event = 'details';
  }

  onShowMore() {
    let action = this.actionSheetCtrl.create({
      buttons: [{
        text: 'Edit',
        icon: 'create',
        handler: () => {
          this.navCtrl.push(EditEventPage, {mode: 'edit', data: this.eventData});
        }
      }, {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.onDelete();
        }
      }]
    });
    action.present();
  }

  onDelete() {
    let alert = this.alertCtrl.create({
      title: 'Delete Event',
      message: 'Are you sure you want to delete this event?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.eventsService.onDeleteEvent(this.eventData.id);
          this.navCtrl.popToRoot();
        }
      }, {
        text: 'No'
      }]
    });
    alert.present();
  }

  onLivePreview() {
    //Check database first if there is a currently live event
    if(this.eventData.status != 'started') {
      //update database of event status = 'started'
    }
    this.navCtrl.setRoot(LiveEventPage);
  }

}
