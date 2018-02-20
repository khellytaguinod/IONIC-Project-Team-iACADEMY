import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController, LoadingController, NavController } from 'ionic-angular';

import { AuthService } from '../../services/auth';
import { SettingsPage } from '../settings/settings';
import { ConnectivityService } from '../../services/connectivity';
import { NoConnectionPage } from '../no-connection/no-connection';

@Component({
  selector: 'page-change-photo',
  templateUrl: 'change-photo.html',
})
export class ChangePhotoPage {
  private offline;
  cameraUrl;
  photoTaken: boolean = false;

  constructor(private camera: Camera, private toastCtrl: ToastController, private authService: AuthService, private loadCtrl: LoadingController, private navCtrl: NavController, private connectivity: ConnectivityService) {
    this.authService.getUserDetails();
    if(this.authService.photoURL != null) {
      this.cameraUrl = this.authService.photoURL;
      this.photoTaken = true;
    }
  }

  ionViewWillEnter() {
    this.offline = this.connectivity.isOffline().subscribe(data => {
      this.navCtrl.push(NoConnectionPage);
    });
  }

  ionViewWillLeave() {
    this.offline.unsubscribe();
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

  onSave() {
    if(this.photoTaken) {
      this.authService.changeUserPhoto(this.cameraUrl)
      .then(data => {
        let load = this.loadCtrl.create({
          content: 'Updating profile photo...'
        });
        load.present();
        load.dismiss();
        this.navCtrl.setRoot(SettingsPage);
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: 'Could not save photo. Please try again',
          duration: 3000
        });
        toast.present();
        this.navCtrl.setRoot(SettingsPage);
      })
    } else {
      let toast = this.toastCtrl.create({
        message: 'No photo was selected.',
        duration: 3000
      });
      toast.present();
    }
  }

}
