import {Component, ViewChild} from '@angular/core';
import {Events, LoadingController, MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import firebase from 'firebase';

import {ProfilePage} from "../pages/profile/profile";
import {SettingsPage} from "../pages/settings/settings";
import {AuthService} from "../services/auth";
import {LoginPage} from "../pages/login/login";
import { EventPage } from '../pages/event/event';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage: any;
  profilePage = ProfilePage;
  settingsPage = SettingsPage;
  isAuthenticated = false;
  username;
  email;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private authService: AuthService, private loadingCtrl: LoadingController, public events: Events) {
    firebase.initializeApp({
      apiKey: "AIzaSyB69ECSbnlRhzzjDWl9G1RkylwdP_r0oVI",
      authDomain: "marathon-app-database.firebaseapp.com",
      databaseURL: "https://marathon-app-database.firebaseio.com",
      projectId: "marathon-app-database",
      storageBucket: "marathon-app-database.appspot.com",
      messagingSenderId: "941647442438"
    });
     .auth().onAuthStateChanged(user => {
      if (user) {
        this.username = user.displayName;
        this.email = user.email;
        this.isAuthenticated = true;
        this.rootPage = EventPage;
        events.subscribe('user:updateName', (name) => {
          this.username = name;
        });
      } else {
        this.isAuthenticated = false;
        this.rootPage = LoginPage;
      }
    });
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onGetUserDetails() {
    this.authService.getUserDetails();
    this.username = this.authService.username;
    this.email = this.authService.email;
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    const loading = this.loadingCtrl.create({
      content: 'Signing you out...',
    });
    loading.present();
    this.menuCtrl.close();
    setTimeout(() => {
      this.authService.logout();
      this.nav.setRoot(LoginPage);
      loading.dismiss();
    }, 800);
  }
}

