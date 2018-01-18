import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {LoginPage} from "../pages/login/login";
import {EventPage} from "../pages/event/event";
import {EventsPage} from "../pages/events/events";
import {ProfilePage} from "../pages/profile/profile";
import {SettingsPage} from "../pages/settings/settings";
import {MapPage} from "../pages/map/map";
import {RegisterPage} from '../pages/register/register';
import {AuthService} from "../services/auth";
// import {HttpClient} from "@angular/common/http";
import { ChangeFrequencyPage } from '../pages/change-frequency/change-frequency';
import { EditUserPage } from '../pages/edit-user/edit-user';

@NgModule({
  declarations: [
    MyApp,
    MapPage,
    LoginPage,
    EventPage,
    EventsPage,
    ProfilePage,
    SettingsPage,
    RegisterPage,
    ChangeFrequencyPage,
    EditUserPage
  ],
  imports: [
    BrowserModule,
    // HttpClient,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MapPage,
    LoginPage,
    EventPage,
    EventsPage,
    ProfilePage,
    SettingsPage,
    RegisterPage,
    ChangeFrequencyPage,
    EditUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
  ]
})
export class AppModule {
}
