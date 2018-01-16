import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { NgForm } from '@angular/forms';

import { RegisterPage } from '../register/register';
import { EventsPage } from '../events/events';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{
  registerPage = RegisterPage;
  eventsPage = EventsPage;

  constructor(private navCtrl: NavController) {}

  onGoToSignup() {
    this.navCtrl.setRoot(this.registerPage);
  }

  onSignin(form: NgForm) {
    this.navCtrl.setRoot(this.eventsPage);
  }
}
