import { Component } from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-change-frequency',
  templateUrl: 'change-frequency.html',
})
export class ChangeFrequencyPage {
  frequency;

  constructor(private viewCtrl: ViewController, private navParams: NavParams) {}

  onSubmit(form: NgForm) {
    this.frequency = form.value.frequency;
    this.navParams.get('resolve')(this.frequency);
  }

  onClose(frequency) {
    this.viewCtrl.dismiss(frequency);
  }

}
