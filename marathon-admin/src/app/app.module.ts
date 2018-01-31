import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {LoginPage} from '../pages/login/login';
import {EventsPage} from '../pages/events/events';
import {EventPage} from '../pages/event/event';
import {EditEventPage} from '../pages/edit-event/edit-event';
import {AuthService} from '../services/auth';
import {EventsService} from '../services/events';
import {ProfilePage} from '../pages/profile/profile';
import { LiveEventPage } from '../pages/live-event/live-event';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    EventsPage,
    EventPage,
    EditEventPage,
    ProfilePage,
    LiveEventPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    EventsPage,
    EventPage,
    EditEventPage,
    ProfilePage,
    LiveEventPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthService,
    EventsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {
}
