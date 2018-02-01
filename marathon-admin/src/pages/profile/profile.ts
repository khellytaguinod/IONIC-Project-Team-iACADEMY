import { Component } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  onChangeName() {
    let alert = this.alertCtrl.create({
      title: 'Edit your name',
      inputs: [{
        name: 'name',
        placeholder: 'Full Name',
        value: 'Admin Name'
      }],
      buttons: [{
        text: 'Save',
        handler: data => {
          if(data.name) {
            console.log(data);
          } else {
            let toast = this.toastCtrl.create({
              message: 'You did not enter a name.',
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

  onChangeEmail() {
    let alert = this.alertCtrl.create({
      title: 'Edit Email Address',
      subTitle: 'Change Admin\'s Email Address',
      inputs: [{
        name: 'email',
        placeholder: 'Email Address',
        value: 'Admin email address',
        type: 'email'
      }],
      buttons: [{
        text: 'Save',
        handler: data => {
          if(data.email) {
            console.log(data);
          } else {
            let toast = this.toastCtrl.create({
              message: 'You did not enter a email address.',
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

  onChangePassword() {
    let alert = this.alertCtrl.create({
      title: 'Change Admin Password',
      subTitle: 'Passwords require at least six characters.',
      inputs: [{
        name: 'oldPassword',
        placeholder: 'Old Password',
        type: 'password'
      }, {
        name: 'newPassword',
        placeholder: 'New Password',
        type: 'password',
        min: 6
      }],
      buttons: [{
        text: 'Save',
        handler: data => {
          if(data.oldPassword && data.newPassword && data.newPassword.length == 6) {
            console.log('Changed password success.');
          } else {
            let toast = this.toastCtrl.create({
              message: 'Please enter a valid password.',
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
