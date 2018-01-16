import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { LoginPage } from '../login/login';
import { EventsPage } from '../events/events';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  loginPage = LoginPage;
  eventsPage = EventsPage;

  constructor(private navCtrl: NavController) {}

  onGoToSignin() {
    this.navCtrl.setRoot(this.loginPage);
  }

  onSignUp(form: NgForm) {
    this.navCtrl.setRoot(this.eventsPage);
  }
}
