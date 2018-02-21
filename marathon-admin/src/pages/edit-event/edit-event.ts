import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, ActionSheetController, ToastController, ModalController } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { EventsService } from '../../services/events';
import { StartPointPage } from '../start-point/start-point';
import { EndPointPage } from '../end-point/end-point';
import { EventsPage } from '../events/events';
import { NoConnectionPage } from '../no-connection/no-connection';
import { ConnectivityService } from '../../services/connectivity';

@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {
  private offline;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  mode: string;
  eventData;
  eventForm: FormGroup;
  minDate = new Date().toISOString();
  photoTaken: boolean = false;
  cameraUrl: string;
  start: string;
  end: string;
  file;

  constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, private camera: Camera, public toastCtrl: ToastController, private eventsService: EventsService, public modalCtrl: ModalController, private connectivity: ConnectivityService) {
    this.mode = this.navParams.get('mode');
    if (this.mode === 'edit') {
      this.eventData = this.navParams.get('data');
      this.start = this.eventData.startPoint;
      this.end = this.eventData.endPoint;
      
    }
    this.initializeForm();
  }

  ionViewWillEnter() {
    this.offline = this.connectivity.isOffline().subscribe(data => {
      console.log(data);
      this.navCtrl.push(NoConnectionPage);
    });
  }

  ionViewWillLeave() {
    this.offline.unsubscribe();
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
    if (this.mode === 'edit') {
      this.eventsService.onEditEvent(this.eventData.id, this.eventForm.value.name, this.eventForm.value.description, this.eventForm.value.date, this.eventForm.value.time, this.eventData.status, this.start, this.end, this.cameraUrl, this.eventData.imgPath, this.photoTaken)
        .then(data => {
          this.initializeForm();
          this.navCtrl.setRoot(EventsPage);
        })
        .catch(err => {
          let toast = this.toastCtrl.create({
            message: 'Could not update event. Please try again.',
            duration: 3000
          });
          toast.present();
        });
    } else {
      this.eventsService.onAddEvent(this.eventForm.value.name, this.eventForm.value.description, this.eventForm.value.date, this.eventForm.value.time, this.start, this.end, this.cameraUrl, this.photoTaken);
      this.initializeForm();
      this.navCtrl.setRoot(EventsPage);
    }
  }

  onSearchStart() {
    let modal = this.modalCtrl.create(StartPointPage);
    modal.present();
    modal.onDidDismiss(data => {
      if(data) {
        this.start = data.start;
      }
    })
  }

  onSearchEnd() {
    let modal = this.modalCtrl.create(EndPointPage);
    modal.present();
    modal.onDidDismiss(data => {
      if(data) {
        this.end = data.end;
      }
    })
  }

  private initializeForm() {
    let name = null;
    let description = null;
    let date = null;
    let time = null;
    let location = null;

    if (this.mode == 'edit') {
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
