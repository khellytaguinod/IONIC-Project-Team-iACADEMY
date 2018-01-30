import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {
  mode: string;
  event: string;
  isActive: boolean = true;
  eventData;
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController) {
    this.mode = this.navParams.get('mode');
    if(this.mode === 'edit') {
      this.eventData = this.navParams.get('data');
    }
  }

  ionViewWillEnter() {
    this.event = 'details';
  }

  onNext(next: string) {
    this.event = next;
  }

  onUploadImg() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: 'Take Photo'
      }, {
        text: 'Choose Photo'
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    actionSheet.present();
  }

  onAddEventDetails(form: NgForm) {
    console.log(form);
    this.isActive = false;
    this.event = 'route';
    // add Spinner before rerouting this.event to route; present spinner on syncing event to firebase
    // create EventsService using Event model to add, edit, delete event
  }

}
