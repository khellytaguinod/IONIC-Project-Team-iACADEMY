import { Component } from '@angular/core';
import { AlertController, ToastController, NavController  } from 'ionic-angular';
import { AuthService } from '../../services/auth';
import { NoConnectionPage } from '../no-connection/no-connection';
import { ConnectivityService } from '../../services/connectivity';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private offline;
  adminName: string;
  adminEmail: string;

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController, private authService: AuthService, public navCtrl: NavController, private connectivity: ConnectivityService) {
    this.getDetails();
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

  onChangeName() {
    let alert = this.alertCtrl.create({
      title: 'Edit your name',
      inputs: [{
        name: 'name',
        placeholder: 'Full Name',
        value: this.adminName
      }],
      buttons: [{
        text: 'Save',
        handler: data => {
          if(data.name) {
            this.authService.editUserName(data.name)
            .then(() => {
              this.getDetails();
              this.successToast();
            })
            .catch(err => this.errorToast('name'))
          } else {
            this.noValueToast('name');
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
      title: 'Change Admin Email',
      inputs: [{
        name: 'email',
        placeholder: 'Email Address',
        value: this.adminEmail,
        type: 'email'
      }],
      buttons: [{
        text: 'Save',
        handler: data => {
          if(data.email) {
            this.authService.editUserEmail(data.email)
            .then(() => {
              this.getDetails();
              this.successToast();
            })
            .catch(err => this.errorToast('email address'))
          } else {
            this.noValueToast('email address');
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
        name: 'newPassword',
        placeholder: 'New Password',
        type: 'password'
      }],
      buttons: [{
        text: 'Save',
        handler: data => {
          if(data.newPassword && data.newPassword.length >= 6) {
            this.authService.changePassword(data.newPassword)
            .then(() => this.successToast())
            .catch(err => this.errorToast('password'))
          } else {
            this.noValueToast('password');
          }
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    alert.present();
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
                this.onChangeEmail();
              } else {
                this.onChangePassword();
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
            this.noValueToast('email address and password');
          }
        }
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    alert.present();
  }


  private getDetails() {
    let admin = this.authService.getCurrentUser();
    if(admin) {
      this.adminName = admin.displayName;
      this.adminEmail = admin.email;
    }
  }

  private successToast() {
    let toast = this.toastCtrl.create({
      message: 'Update successfull',
      duration: 2500
    });
    toast.present();

    setTimeout(() => {
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
    }, 1000);

  }

  private errorToast(type: string) {
    let toast = this.toastCtrl.create({
      message: `Could not update ${type}. Please try again.`,
      duration: 2500
    });
    toast.present();
  }

  private noValueToast(type: string) {
    let toast = this.toastCtrl.create({
      message: `Please enter a valid ${type}.`,
      duration: 2500
    });
    toast.present();
  }
}
