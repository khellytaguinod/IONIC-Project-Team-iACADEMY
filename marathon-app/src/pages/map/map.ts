import {Component, ViewChild} from '@angular/core';
import {Http} from '@angular/http';

import {NavParams, Platform, AlertController, NavController, LoadingController} from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  LatLng
} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';
import parseTrack from 'parse-gpx/src/parseTrack'
import xml2js from 'xml2js';

import {LocationTrackerProvider} from '../../providers/location-tracker/location-tracker';
import {ConnectivityService} from '../../services/connectivity';
import {Timer} from '../../app/timer';
import {State} from '../../app/state';
import firebase from 'firebase';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  isOffline: boolean;
  private online;
  private offline;
  @ViewChild('rootNavController') nav: NavController;

  public list: any[] = [];
  public gpxData: any;

  name;
  lat;
  lng;
  map: GoogleMap;
  id;
  subscription;
  frequency;
  loading;
  intervalId;
  userId = firebase.auth().currentUser.uid;
  unregisterBackButtonAction: any;

  constructor(private geolocation: Geolocation,
              public locationTracker: LocationTrackerProvider,
              private navParams: NavParams,
              private platform: Platform,
              private alertCtrl: AlertController,
              public http: Http,
              private loadCtrl: LoadingController,
              private navCtrl: NavController,
              private storage: Storage,
              private connectivity: ConnectivityService,
              private timer: Timer,
              private state: State) {
    this.loading = loadCtrl.create({
      content: "Preparing your course map"
    });
    this.loading.present();
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('event');
    storage.get(this.userId).then(val => {
      this.frequency = val;
    })
  }

  ionViewWillEnter() {
    this.offline = this.connectivity.isOffline().subscribe(data => {
      console.log(data);
      this.isOffline = true;
    });
    this.online = this.connectivity.isOnline().subscribe(data => {
      console.log(data);
      this.isOffline = false;
    });
  }

  ionViewDidEnter() {
    this.initializeBackButtonCustomHandler();
    this.fetchGPX();
    this.onStart(this.id);
    this.intervalId = setInterval(() => {
      this.locationTracker.saveToDatabase(this.id);
    }, this.frequency)
  }

  ionViewDidLeave() {
    this.unregisterBackButtonAction && this.unregisterBackButtonAction()
    clearInterval(this.intervalId);
  }

  initializeBackButtonCustomHandler(): void {
    this.unregisterBackButtonAction = this.platform.registerBackButtonAction(() => {
      this.customHandleBackButton();
    }, 101);
  }

  private customHandleBackButton(): void {
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to quit?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.navCtrl.pop().then(() => {
            this.navCtrl.pop();
            this.locationTracker.stopTracking(this.id);
          });
        }
      }, {
        text: 'No',
        role: 'cancel',
        handler: () => {
          this.navCtrl.pop().then(() => {
            this.initializeBackButtonCustomHandler();
          });
        }
      }]
    });
    alert.present();
    this.unregisterBackButtonAction && this.unregisterBackButtonAction()
  }

  ionViewWillLeave() {
    this.offline.unsubscribe();
    this.online.unsubscribe();
  }

  fetchGPX() {
    this.http.get('https://marathon-app-database.firebaseapp.com/runRouteFinal.gpx').subscribe(data => {
      let dataCoords: any = data;
      let parser = new xml2js.Parser();
      parser.parseString(dataCoords._body, (err, xml) => {
        if (err) {
          console.log(err);
        } else {
          this.gpxData = parseTrack(xml.gpx.trk);
          for (let i = 0; i < this.gpxData.length; i++) {
            let coordinates = {lat: JSON.parse(this.gpxData[i].latitude), lng: JSON.parse(this.gpxData[i].longitude)};
            this.list.push(coordinates);
          }

          setTimeout(() => {
            this.loadMap();
          }, 5000);
        }
      });
    });
  }


  loadMap() {
    this.loading.dismiss();
    this.timerPlay();
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: this.list[0],
        zoom: 16
      },
      controls: {
        compass: true,
        myLocation: true,
        myLocationButton: true,
        indoorPicker: false,
        zoom: true
      },
      preferences: {
        building: true
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {

        this.map.addPolyline({
          points: this.list,
          'color': '#8342f4',
          'width': 7,
          'geodesic': false,
          'clickable': false
        });

        this.map.addMarker({
          'position': this.list[0],
          'icon': '##49cc67',
        }); // marker for start point

        this.map.addMarker({
          'position': this.list[this.list.length - 1],
          'icon': 'red',
        }); // marker for end point

      }).catch((err) => {
      alert('error loading course map')
      console.log('Error setting up', err);
    });

    setInterval(() => {
      this.drawCurrentTrack()
    }, 5000);
  }

  drawCurrentTrack() {

    this.map.addPolyline({
      points: this.locationTracker.userTrack,
      'color': '#29d855',
      'width': 6,
      'geodesic': false,
      'clickable': false
    });

    this.map.setCameraTarget(this.locationTracker.userTrack[this.locationTracker.userTrack.length - 1]);

  }


  stopDrawingTrack() {
    this.subscription.unsubscribe();
  }

  onStart(eventId) {
    this.locationTracker.startTracking(eventId);
  }

  onFinish() {
    this.timerStop();
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to quit?',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.timerReset();
          this.locationTracker.stopTracking(this.id);
          this.navCtrl.popToRoot();
        }
      }, {
        text: 'No',
        role: 'cancel',
        handler: () => {
          this.timerPlay();
        }
      }]
    });
    alert.present();
  }

  timerPlay() {
    this.timer.start();
    this.state.setPlay();
  }

  timerStop() {
    this.timer.stop();
    this.state.setStop();
  }

  timerReset() {
    this.timer.reset();
    this.state.setBackward();
  }

  private roundOff(number) {
    let factor = Math.pow(10, 4);
    return Math.round(number * factor) / factor;
  }
}
