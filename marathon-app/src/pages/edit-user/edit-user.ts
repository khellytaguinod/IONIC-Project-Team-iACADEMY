import {Component, OnInit} from '@angular/core';
import {ViewController, NavParams, ToastController, Events} from 'ionic-angular';
import {NgForm} from '@angular/forms';

import {AuthService} from '../../services/auth';
import firebase from "firebase";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage implements OnInit {
  username;
  email;
  name;
  mode;
  toEdit;
  rootPage: any;

  constructor(private viewCtrl: ViewController, private authService: AuthService, private navParams: NavParams, private toastCtrl: ToastController, private events: Events) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.name = user.displayName;
        this.email = user.email;
        console.log(this.name);
      } else {
        this.rootPage = LoginPage;
      }
    });
  }

  ngOnInit() {
    this.toEdit = this.navParams.get('editType');
    if (this.toEdit === 'editName') {
      this.mode = 'Edit Name';
    } else if (this.toEdit === 'editEmail') {
      this.mode = 'Change Email';
    } else if (this.toEdit === 'editPass') {
      this.mode = 'Change Password';
    }
  }

  ionViewDidLoad() {
    this.authService.getUserDetails();
    this.username = this.authService.username;
    this.email = this.authService.email;
  }

  onEditName(form: NgForm) {
    if (form.valid) {
      this.authService.editUser(form.value.name, '');
      this.events.publish('user:updateName', form.value.name);
      this.viewCtrl.dismiss();
    } else {
      let toast = this.toastCtrl.create({
        message: 'Please enter your name.',
        duration: 3000
      });
      toast.present();
    }
  }

  onEditEmail(form: NgForm) {
    if (form.valid) {
      this.authService.updateUserEmail(form.value.email);
      this.viewCtrl.dismiss();
    } else {
      let toast = this.toastCtrl.create({
        message: 'Please enter your email.',
        duration: 3000
      });
      toast.present();
    }
  }

  onChangePassword(form: NgForm) {
  }

}
