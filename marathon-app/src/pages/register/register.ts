import {Component} from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController} from 'ionic-angular';
import {NgForm} from "@angular/forms";

import {LoginPage} from '../login/login';
import {AuthService} from "../../services/auth";

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loginPage = LoginPage;

  constructor(private navCtrl: NavController, private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  onSignUp(form: NgForm) {
    const loading = this.loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.authService.signup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Signup failed',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
      });
  }

  onGoToSignin() {
    this.navCtrl.setRoot(this.loginPage);
  }
}
