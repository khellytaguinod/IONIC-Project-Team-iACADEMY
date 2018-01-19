import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ChangeFrequencyPage} from '../change-frequency/change-frequency';
import {EditUserPage} from '../edit-user/edit-user';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  frequency = 'Realtime';

  constructor(public navCtrl: NavController) {
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
      this.navCtrl.push(EditUserPage, {editType: type});
    } else {
      this.navCtrl.push(EditUserPage, {editType: type});
    }
  }

}
