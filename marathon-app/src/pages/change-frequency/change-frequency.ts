import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-change-frequency',
  templateUrl: 'change-frequency.html',
})
export class ChangeFrequencyPage {
  frequency;

  constructor(private navParams: NavParams) {}

  onSubmit(form: NgForm) {
    this.frequency = form.value.frequency;
    this.navParams.get('resolve')(this.frequency);
  }

}
