import {Component, ViewChild} from '@angular/core';
import {AlertController, Events, LoadingController, MenuController, NavController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import firebase from 'firebase';

import {ProfilePage} from "../pages/profile/profile";
import {SettingsPage} from "../pages/settings/settings";
import {AuthService} from "../services/auth";
import {LoginPage} from "../pages/login/login";
import {EventPage} from '../pages/event/event';
import {Storage} from "@ionic/storage";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage: any;
  profilePage = ProfilePage;
  settingsPage = SettingsPage;
  isAuthenticated = false;
  // username;
  // email;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private authService: AuthService, private loadingCtrl: LoadingController, public events: Events, private alertCtrl: AlertController, private storage: Storage) {
    firebase.initializeApp({
      apiKey: "AIzaSyB69ECSbnlRhzzjDWl9G1RkylwdP_r0oVI",
      authDomain: "marathon-app-database.firebaseapp.com",
      databaseURL: "https://marathon-app-database.firebaseio.com",
      projectId: "marathon-app-database",
      storageBucket: "marathon-app-database.appspot.com",
      messagingSenderId: "941647442438"
    });

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase.database().ref('users/' + user.uid).once('value').then(snapshot => {
          if (snapshot.val().userType === 'admin') {
            let message = 'Only accessible by users.';
            const alert = this.alertCtrl.create({
              title: 'Signin failed',
              message: message,
              buttons: ['Ok']
            });
            alert.present();
            this.authService.logout();
          } else {
            this.rootPage = EventPage;
            let id = firebase.auth().currentUser.uid;
            this.storage.get('interval').then(val => {
              if (val === null) {
                storage.set(id, 60000)
              }
            })
          }
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

  // onGetUserDetails() {
  //   this.authService.getUserDetails();
  //   this.username = this.authService.username;
  //   this.email = this.authService.email;
  // }

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

