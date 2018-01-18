import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage implements OnInit {
  username;
  email;
  mode;
  isEditUser: boolean;

  constructor(private viewCtrl: ViewController, private authService: AuthService, private navParams: NavParams) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.isEditUser = (this.mode === 'Edit User Details') ? true : false;
  }

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

  onChangePassword(form: NgForm) {}

}
