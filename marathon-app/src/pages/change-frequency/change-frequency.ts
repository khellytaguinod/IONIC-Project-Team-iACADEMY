import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import {Storage} from "@ionic/storage";
import firebase from 'firebase';

@Component({
  selector: 'page-change-frequency',
  templateUrl: 'change-frequency.html',
})
export class ChangeFrequencyPage {
  frequency;
  interval;
  id = firebase.auth().currentUser.uid;


  constructor(private navParams: NavParams, private storage: Storage) {
    storage.get(this.id).then(val => {
      this.interval = val;
    })
  }

  onSubmit(form: NgForm) {
    this.frequency = form.value.frequency;
    this.navParams.get('resolve')(this.frequency);
  }

}
