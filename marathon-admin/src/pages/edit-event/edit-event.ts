import {Component} from '@angular/core';
import {NavController, NavParams, ActionSheetController, ToastController, LoadingController} from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  photoTaken: boolean = false;
  cameraUrl: string;
  imgPath: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController, private camera: Camera, private toastCtrl: ToastController,private eventsService: EventsService, private loadCtrl: LoadingController) {
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
        text: 'Take Photo',
        icon: 'camera',
        handler: () => this.onTakePhoto()
      }, {
        text: 'Choose Photo',
        icon: 'albums',
        handler: () => this.onOpenGallery()
      }]
    });
    actionSheet.present();
  }

  onTakePhoto() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.DATA_URL
    }
    this.camera.getPicture(options).then(imgData => {
      this.cameraUrl = 'data:image/jpeg;base64,' + imgData;
      this.photoTaken = true;
    }).catch(err => {
      let toast = this.toastCtrl.create({
        message: 'Could not take the image. Please try again.',
        duration: 2500
      });
      toast.present();
    })
  }

  onOpenGallery() {
    const options: CameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
      destinationType: this.camera.DestinationType.DATA_URL
    }
    this.camera.getPicture(options).then(imgData => {
      this.cameraUrl = 'data:image/jpeg;base64,' + imgData;
      this.photoTaken = true;
    }).catch(err => {
      let toast = this.toastCtrl.create({
        message: 'Could not take the image. Please try again.',
        duration: 2500
      });
      toast.present();
    })
  }

  onAddEventDetails() {
    if(this.mode === 'edit') {
      this.eventsService.onEditEvent(this.eventData.id, this.eventForm.value.name, this.eventForm.value.description, this.eventForm.value.date, this.eventForm.value.time, this.eventForm.value.location, this.cameraUrl, this.photoTaken)
      .then(data => {
        let loading = this.loadCtrl.create({
          content: 'Updating event...'
        });
        loading.present();
        this.isActive = false;
        this.event = 'route';
        loading.dismiss();
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: 'Could not update event. Please try again.',
          duration: 3000
        });
        toast.present();
      });
    } else {
      this.eventsService.onAddEvent(this.eventForm.value.name, this.eventForm.value.description, this.eventForm.value.date, this.eventForm.value.time, this.eventForm.value.location, this.cameraUrl, this.photoTaken)
      .then(data => {
        let loading = this.loadCtrl.create({
          content: 'Saving event...'
        });
        loading.present();
        this.isActive = false;
        this.event = 'route';
        loading.dismiss();
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: 'Could not save event. Please try again.',
          duration: 3000
        });
        toast.present();
      });
    }
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
