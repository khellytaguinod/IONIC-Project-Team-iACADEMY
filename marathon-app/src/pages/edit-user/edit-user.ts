import {Component, OnInit} from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';
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

  constructor(private viewCtrl: ViewController, private authService: AuthService, private navParams: NavParams) {
    this.authService.getUserDetails();
    this.username = this.authService.username;
    this.email = this.authService.email;
  }

  ngOnInit() {
    this.toEdit = this.navParams.get('editType');
  }

  onClose(change = false) {
    this.viewCtrl.dismiss(change);
  }

  onEditName(form: NgForm){
    this.authService.editUser(form.value.name, '');
    this.viewCtrl.dismiss();
  }

  onEditEmail(form: NgForm) {
    this.authService.updateUserEmail(form.value.email);
    this.viewCtrl.dismiss();
  }

  onChangePassword(form: NgForm) {
  }

}
