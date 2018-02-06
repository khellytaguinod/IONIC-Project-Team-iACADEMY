import {Component, ViewChild} from '@angular/core';
import {Platform, NavController, MenuController, LoadingController, AlertController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import firebase from 'firebase';

import {LoginPage} from '../pages/login/login';
import {EventsPage} from '../pages/events/events';
import {AuthService} from '../services/auth';
import {ProfilePage} from '../pages/profile/profile';
import { LiveEventPage } from '../pages/live-event/live-event';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage: any;
  eventsPage = EventsPage;
  profilePage = ProfilePage;
  livePrev = LiveEventPage;
  username;
  email;
  isAuthenticated: boolean = false;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController, private loadCtrl: LoadingController, private authService: AuthService, private alertCtrl: AlertController) {
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
          if (snapshot.val().userType === 'user') {
            let message = 'Account not authorized';
            const alert = this.alertCtrl.create({
              title: 'Signin failed',
              message: message,
              buttons: ['Ok']
            });
            alert.present();
            this.authService.logout();
          } else {
            this.rootPage = EventsPage;
          }
        });
      } else {
        this.isAuthenticated = false;
        this.rootPage = LoginPage;
      }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoadPage(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    const loading = this.loadCtrl.create({
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

