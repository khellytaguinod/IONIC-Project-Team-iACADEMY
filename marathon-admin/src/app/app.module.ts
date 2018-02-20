import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { EventsPage } from '../pages/events/events';
import { EventPage } from '../pages/event/event';
import { EditEventPage } from '../pages/edit-event/edit-event';
import { AuthService } from '../services/auth';
import { EventsService } from '../services/events';
import { ProfilePage } from '../pages/profile/profile';
import { LiveEventPage } from '../pages/live-event/live-event';
import { NoConnectionPage } from '../pages/no-connection/no-connection';
import { ParticipantPage } from '../pages/participant/participant';
import { ParticipantsPage } from '../pages/participants/participants';
import { StartPointPage } from '../pages/start-point/start-point';
import { EndPointPage } from '../pages/end-point/end-point';
import { Network } from '@ionic-native/network';
import { ConnectivityService } from '../services/connectivity';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    EventsPage,
    EventPage,
    EditEventPage,
    ProfilePage,
    LiveEventPage,
    NoConnectionPage,
    ParticipantPage,
    ParticipantsPage,
    StartPointPage,
    EndPointPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    EventsPage,
    EventPage,
    EditEventPage,
    ProfilePage,
    LiveEventPage,
    NoConnectionPage,
    ParticipantPage,
    ParticipantsPage,
    StartPointPage,
    EndPointPage
  ],
  providers: [
    GoogleMaps,
    StatusBar,
    SplashScreen,
    AuthService,
    EventsService,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    Network,
    ConnectivityService,
    FileChooser
  ]
})
export class AppModule {
}
