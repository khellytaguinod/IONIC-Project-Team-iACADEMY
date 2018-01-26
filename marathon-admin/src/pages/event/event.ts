import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  event: string;
  checkpoint = 'All';
  joined = [1];

  constructor(private alertCtrl: AlertController) {}

  ionViewWillEnter() {
    this.event = 'details';
  }

  onSelect() {
    let alert = this.alertCtrl.create({
      title: 'Checkpoints',
      inputs: [{
        type: 'radio',
        label: 'All',
        value: 'All',
        checked: true
      }, {
        type: 'radio',
        label: 'Checkpoint 1',
        value: 'Checkpoint 1'
      }, {
        type: 'radio',
        label: 'Checkpoint 2',
        value: 'Checkpoint 2'
      }, {
        type: 'radio',
        label: 'Checkpoint 3',
        value: 'Checkpoint 3'
      }, {
        type: 'radio',
        label: 'Checkpoint 4',
        value: 'Checkpoint 4'
      }],
      buttons: [{
        text: 'Ok',
        handler: data => {
          this.checkpoint = data;
          console.log(this.checkpoint);
        }
      }]
    });
    alert.present();
  }

  onSort() {
    let alert = this.alertCtrl.create({
      title: 'Sort By',
      inputs: [{
        type: 'radio',
        label: 'Category',
        value: 'category',
        checked: true
      }, {
        type: 'radio',
        label: 'Name',
        value: 'name'
      }, {
        type: 'radio',
        label: 'Runner Number',
        value: 'runnerNum'
      }],
      buttons: [
        {text: 'Ok'},
        {text: 'Cancel'}
      ]
    });
    alert.present();
  }

}
