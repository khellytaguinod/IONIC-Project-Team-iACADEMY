import {Component, OnInit} from '@angular/core';
import {ViewController, NavParams, ToastController} from 'ionic-angular';
import {NgForm} from '@angular/forms';

import {AuthService} from '../../services/auth';

@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage implements OnInit {
  username;
  email;
  mode;
  toEdit;

  constructor(private viewCtrl: ViewController, private authService: AuthService, private navParams: NavParams, private toastCtrl: ToastController) {
    this.authService.getUserDetails();
    this.username = this.authService.username;
    this.email = this.authService.email;
  }

  ngOnInit() {
    this.toEdit = this.navParams.get('editType');
    if(this.toEdit === 'editName') {
      this.mode = 'Edit Name';
    } else if(this.toEdit === 'editEmail') {
      this.mode = 'Change Email';
    } else if(this.toEdit === 'editPass') {
      this.mode = 'Change Password';
    }
  }

  onEditName(form: NgForm) {
    if(form.valid) {
      this.authService.editUser(form.value.name, '');
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
    if(form.valid) {
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
