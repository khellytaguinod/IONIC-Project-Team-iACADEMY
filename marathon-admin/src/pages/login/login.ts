import {Component} from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController} from 'ionic-angular';
import {NgForm} from '@angular/forms';

import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, private authService: AuthService, private loadCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }


  onSignin(form: NgForm) {
    let loading = this.loadCtrl.create({
      content: 'Signing you in...'
    });
    loading.present();
    this.authService.signin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signin failed',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      })
  }
}
