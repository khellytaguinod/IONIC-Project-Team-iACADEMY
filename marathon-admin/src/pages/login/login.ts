import {Component} from '@angular/core';
import {LoadingController, MenuController, NavController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {HomePage} from '../home/home';
import {AuthService} from "../../services/auth";
import firebase from 'firebase';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private menuCtrl: MenuController, private authService: AuthService, private loadCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }


  onSignin(form: NgForm) {
    this.authService.signin(form.value.email, form.value.password);
    this.navCtrl.setRoot(HomePage);
  }
}
