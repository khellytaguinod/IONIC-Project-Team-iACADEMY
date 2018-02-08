import {Component} from '@angular/core';
import {NavController, AlertController, ToastController} from 'ionic-angular';
import {ChangeFrequencyPage} from '../change-frequency/change-frequency';
import {EditUserPage} from '../edit-user/edit-user';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  frequency = 'Realtime';

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private authService: AuthService, public toastCtrl: ToastController) {
  }

  onChangeFrequency() {
    new Promise((resolve, reject) => {
      this.navCtrl.push(ChangeFrequencyPage, {resolve: resolve});
    }).then(data => {
        this.frequency = `${data}`;
        this.navCtrl.pop();
    });
  }

  onEditProfile(type) {
    if (type === 'editName') {
      this.navCtrl.push(EditUserPage, {editType: type});
    } else if (type === 'editEmail') {
      // this.navCtrl.push(EditUserPage, {editType: type});
      this.onReauthenticate('email');
    } else {
      // this.navCtrl.push(EditUserPage, {editType: type});
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
