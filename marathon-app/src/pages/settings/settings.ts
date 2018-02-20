import {Component} from '@angular/core';
import {NavController, AlertController, ToastController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import firebase from 'firebase';

import {ChangeFrequencyPage} from '../change-frequency/change-frequency';
import {EditUserPage} from '../edit-user/edit-user';
import { AuthService } from '../../services/auth';
import { ChangePhotoPage } from '../change-photo/change-photo';
import { ConnectivityService } from '../../services/connectivity';
import { NoConnectionPage } from '../no-connection/no-connection';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  private offline;
  frequency: string = `1 minute`;
  id = firebase.auth().currentUser.uid;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private authService: AuthService, public toastCtrl: ToastController, private storage: Storage, private connectivity: ConnectivityService) {
    storage.get(this.id).then(val => {
      if(val == 30000){
        this.frequency = val/1000 + ' seconds'
      } else if (val == 60000) {
        this.frequency = val/1000/10/6 + ' minute'
      } else {
        this.frequency = val/1000/10/6 + ' minutes'
      }
    })
  }

  ionViewWillEnter() {
    this.offline = this.connectivity.isOffline().subscribe(data => {
      this.navCtrl.push(NoConnectionPage);
    });
  }

  ionViewWillLeave() {
    this.offline.unsubscribe();
  }

  onChangeFrequency() {
    new Promise((resolve, reject) => {
      this.navCtrl.push(ChangeFrequencyPage, {resolve: resolve});
    }).then(data => {
      let num = Number(data);
      if(data === '30') {
        this.frequency = `${data} seconds`;
        this.storage.set(this.id, num * 1000);
      } else if (data === '1') {
        this.frequency = `${data} minute`;
        this.storage.set(this.id, num * 6 * 10 * 1000);
      } else {
        this.frequency = `${data} minutes`;
        this.storage.set(this.id, num * 6 * 10 * 1000);
      }
      this.navCtrl.pop();
    });
  }

  onChangePicture() {
    this.navCtrl.push(ChangePhotoPage);
  }

  onEditProfile(type) {
    if (type === 'editName') {
      this.navCtrl.push(EditUserPage, {editType: type});
    } else if (type === 'editEmail') {
      this.onReauthenticate('email');
    } else {
      this.onReauthenticate('password');
    }
  }

  onReauthenticate(type: string) {
    let alert = this.alertCtrl.create({
      title: 'Sign In',
      subTitle: 'Enter your current email and password before changing your ' + type,
      inputs: [{
        name: 'email',
        placeholder: 'Email Address',
        type: 'email'
      }, {
        name: 'password',
        placeholder: 'Password',
        type: 'password'
      }],
      buttons: [{
        text: 'Next',
        handler: data => {
          if(data.email && data.password) {
            this.authService.reauthenticateUser(data.email, data.password)
            .then(() => {
              if(type === 'email') {
                this.navCtrl.push(EditUserPage, {editType: 'editEmail'});
              } else {
                this.navCtrl.push(EditUserPage, {editType: 'editPass'});
              }
            })
            .catch(err => {
              let toast = this.toastCtrl.create({
                message: 'Could not authenticate. Please try again.',
                duration: 2500
              });
              toast.present();
            })
          } else {
            let toast = this.toastCtrl.create({
              message: `Please enter a valid ${type}.`,
              duration: 2500
            });
            toast.present();
          }
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    alert.present();
  }

}
