import {Component} from '@angular/core';
import {AlertController, LoadingController, MenuController, NavController} from 'ionic-angular';
import {RegisterPage} from '../register/register';
import {AuthService} from "../../services/auth";
import {NgForm} from "@angular/forms";
import {EventsPage} from '../events/events';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  registerPage = RegisterPage;
  eventsPage = EventsPage;

  constructor(private navCtrl: NavController, private authService: AuthService, private loadingCtrl: LoadingController, private alertCtrl: AlertController, private menuCtrl: MenuController) {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  onSignin(form: NgForm) {
    const loading = this.loadingCtrl.create({
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

  onGoToSignup() {
    this.navCtrl.setRoot(this.registerPage);
  }
}
