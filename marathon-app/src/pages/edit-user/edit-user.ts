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
      this.authService.editUser(form.value.name, '')
      .then(() => {
        this.events.publish('user:updateName', form.value.name);
        this.successToast();
      })
      .catch(err => this.errorToast('name'));
      this.viewCtrl.dismiss();
    } else {
      this.noValueToast('name');
    }
  }

  onEditEmail(form: NgForm) {
    if (form.valid) {
      this.authService.updateUserEmail(form.value.email)
      .then(() => this.successToast())
      .catch(err => this.errorToast('email'));
      this.viewCtrl.dismiss();
    } else {
      this.noValueToast('email');
    }
  }

  onChangePassword(form: NgForm) {
    if(form.valid) {
      this.authService.changePassword(form.value.newPassword)
      .then(() => {
        this.successToast();
        this.viewCtrl.dismiss();
      })
      .catch(err => this.errorToast('password'));
    } else {
      this.noValueToast('password');
    }
  }

  private successToast() {
    let toast = this.toastCtrl.create({
      message: 'Update successfull',
      duration: 2500
    });
    toast.present();
  }

  private errorToast(type: string) {
    let toast = this.toastCtrl.create({
      message: `Could not update ${type}. Please try again.`,
      duration: 2500
    });
    toast.present();
  }

  private noValueToast(type: string) {
    let toast = this.toastCtrl.create({
      message: `Please enter a valid ${type}.`,
      duration: 2500
    });
    toast.present();
  }

}
