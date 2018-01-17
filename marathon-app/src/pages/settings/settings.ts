import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ChangeFrequencyPage } from '../change-frequency/change-frequency';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  frequency;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {}

  onChangeFrequency() {
    let modal = this.modalCtrl.create(ChangeFrequencyPage);
    modal.present();
    modal.onDidDismiss((change: boolean) => {
      if(change) {
        this.getFrequency();
      }
    })
  }

  getFrequency() {
    this.frequency = this.navParams.get('frequency');
  }

}
