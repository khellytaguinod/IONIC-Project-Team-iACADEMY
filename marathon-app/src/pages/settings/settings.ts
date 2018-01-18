import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ChangeFrequencyPage } from '../change-frequency/change-frequency';
import { EditUserPage } from '../edit-user/edit-user';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  changeFrequency = ChangeFrequencyPage;
  editUser = EditUserPage;
  changePassword = EditUserPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {}

  onOpenPage(page: any) {
    let modal;
    if(this.editUser) {
      modal = this.modalCtrl.create(page, {mode: 'Edit User Details'});
    } else if (this.changePassword) {
      modal = this.modalCtrl.create(page, {mode: 'Change Password'});
    } else {
      modal = this.modalCtrl.create(page);
    }
    modal.present();
  }

}
