import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private menuCtrl: MenuController) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }


  onSignin(form: NgForm) {
    this.navCtrl.setRoot(HomePage);
  }

}
