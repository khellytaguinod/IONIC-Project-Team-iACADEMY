import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { EventsPage } from '../pages/events/events';
import { ProfilePage } from '../pages/profile/profile';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('content') nav: NavController;
  rootPage:any = LoginPage;
  homePage = HomePage;
  eventsPage = EventsPage;
  profilePage = ProfilePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private menuCtrl: MenuController) {
    firebase.initializeApp({
      apiKey: "AIzaSyB69ECSbnlRhzzjDWl9G1RkylwdP_r0oVI",
      authDomain: "marathon-app-database.firebaseapp.com",
      databaseURL: "https://marathon-app-database.firebaseio.com",
      projectId: "marathon-app-database",
      storageBucket: "marathon-app-database.appspot.com",
      messagingSenderId: "941647442438"
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
}

