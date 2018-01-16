import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage{
  registerPage = RegisterPage;

  constructor(private navCtrl: NavController) {}

  onGoToSignup() {
    this.navCtrl.push(this.registerPage);
  }


}
