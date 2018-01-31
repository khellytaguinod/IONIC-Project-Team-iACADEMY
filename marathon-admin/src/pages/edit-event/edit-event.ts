import {Component} from '@angular/core';
import {NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventsService } from '../../services/events';

@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {
  mode: string;
  event: string;
  isActive: boolean = true;
  eventData;
  eventForm: FormGroup;
  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private eventsService: EventsService) {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'edit') {
      this.eventData = this.navParams.get('data');
      this.isActive = false;
    }
    this.initializeForm();
  }

  ionViewWillEnter() {
    this.event = 'details';
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

  onAddEventDetails() {
    // this.eventsService.onAddEvent(this.eventForm.value.name, this.eventForm.value.description, this.eventForm.value.date, this.eventForm.value.time, this.eventForm.value.location);
    console.log(this.eventForm.value);
    this.isActive = false;
    this.event = 'route';
    // add Spinner before rerouting this.event to route; present spinner on syncing event to firebase
    // create EventsService using Event model to add, edit event
  }

  private initializeForm() {
    let name = null;
    let description = null;
    let date = null;
    let time = null;
    let location = null;

    if(this.mode == 'edit') {
      name = this.eventData.name;
      description = this.eventData.description;
      date = new Date(this.eventData.date).toISOString();
      time = this.eventData.time;
      // time = new Date('1970-01-01T' + this.eventData.time + 'Z').toISOString();
      location = this.eventData.location;
    }

    this.eventForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'description': new FormControl(description),
      'date': new FormControl(date, Validators.required),
      'time': new FormControl(time, Validators.required),
      'location': new FormControl(location, Validators.required)
    });
  }

}
