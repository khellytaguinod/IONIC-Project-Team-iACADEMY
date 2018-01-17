import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-change-frequency',
  templateUrl: 'change-frequency.html',
})
export class ChangeFrequencyPage {
  frequency;

  constructor(private viewCtrl: ViewController) {}

  onSubmit(form: NgForm) {
    this.frequency = form.value.frequency;
    this.onClose();
  }

  onClose(change = false) {
    this.viewCtrl.dismiss(change);
  }

}
