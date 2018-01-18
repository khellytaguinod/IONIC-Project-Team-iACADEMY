import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
// import firebase from 'firebase';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {
  username;
  email;
  // user;

  constructor(private viewCtrl: ViewController, private authService: AuthService) {}

  ionViewWillEnter() {
    this.onGetUserDetails();
  }

  onClose(change = false) {
    this.viewCtrl.dismiss(change);
  }

  onGetUserDetails() {
    this.authService.getUserDetails();
    this.username = this.authService.username;
    this.email = this.authService.email;

  }

  onEditUser(form: NgForm) {
    this.authService.editUser(form.value.name, '');
    this.authService.updateUserEmail(form.value.email);
    this.viewCtrl.dismiss();
  }

}
