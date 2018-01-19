import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ChangeFrequencyPage } from '../change-frequency/change-frequency';
import { EditUserPage } from '../edit-user/edit-user';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  frequency:string = 'Realtime';

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {}

  onChangeFrequency() {
    let modal = this.modalCtrl.create(ChangeFrequencyPage, {frequency: 'realtime'});
    modal.onDidDismiss(data => {
      if(data == true) {
        this.frequency = 'Realtime';
      } else {
        this.frequency = data;
      }
    })
    modal.present();
  }

  onEditUser() {
    let modal = this.modalCtrl.create(EditUserPage, {mode: 'Edit User Details'});
    modal.present();
  }

  onChangePassword() {
    let modal = this.modalCtrl.create(EditUserPage, {mode: 'Change Password'});
    modal.present();
  }

}
