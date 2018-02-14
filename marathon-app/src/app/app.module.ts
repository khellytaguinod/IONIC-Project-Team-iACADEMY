import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {GoogleMaps} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation';
import {IonicStorageModule} from '@ionic/storage';

import {MyApp} from './app.component';
import {LoginPage} from "../pages/login/login";
import {EventPage} from "../pages/event/event";
import {ProfilePage} from "../pages/profile/profile";
import {SettingsPage} from "../pages/settings/settings";
import {MapPage} from "../pages/map/map";
import {RegisterPage} from '../pages/register/register';
import {AuthService} from "../services/auth";
import {ChangeFrequencyPage} from '../pages/change-frequency/change-frequency';
import {EditUserPage} from '../pages/edit-user/edit-user';
import {StatsPage} from '../pages/stats/stats';
import {LocationTrackerProvider} from '../providers/location-tracker/location-tracker';
import { Network } from '@ionic-native/network';
import { ConnectivityService } from '../services/connectivity';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    LoginPage,
    EventPage,
    ProfilePage,
    SettingsPage,
    RegisterPage,
    ChangeFrequencyPage,
    EditUserPage,
    StatsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    LoginPage,
    EventPage,
    ProfilePage,
    SettingsPage,
    RegisterPage,
    ChangeFrequencyPage,
    EditUserPage,
    StatsPage
  ],
  providers: [
    GoogleMaps,
    BackgroundGeolocation,
    Geolocation,
    StatusBar,
    SplashScreen,
    AuthService,
    LocationTrackerProvider,
    Network,
    ConnectivityService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
