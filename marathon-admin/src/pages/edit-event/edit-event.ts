import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-edit-event',
  templateUrl: 'edit-event.html',
})
export class EditEventPage {
  mode: string;
  event: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private actionSheetCtrl: ActionSheetController) {
    this.mode = this.navParams.get('mode');
  }

  ionViewWillEnter() {
    this.event = 'details';
  }

  onNext(next: string) {
    this.event = next;
  }

  onUploadImg() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Upload Photo',
      buttons: [{
        text: 'Take Photo'
      }, {
        text: 'Choose Photo'
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    });
    actionSheet.present();
  }

}
