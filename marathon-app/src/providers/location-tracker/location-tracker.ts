import {Injectable, NgZone} from '@angular/core';

import {Geolocation, Geoposition} from '@ionic-native/geolocation';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation';
import 'rxjs/add/operator/filter';

import {LatLng} from '@ionic-native/google-maps';
import firebase from "firebase";
import {Storage} from '@ionic/storage';

@Injectable()
export class LocationTrackerProvider {

  public userTrackFirebase: any = [];
  public userTrack: any = [];
  public list: any = [];
  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  public name: string;
  userId = firebase.auth().currentUser.uid;

  constructor(public zone: NgZone, private geolocation: Geolocation, private backgroundGeolocation: BackgroundGeolocation, private storage: Storage) {
  }

  startTracking(eventId) {
    // Background Tracking
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      stopOnTerminate: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;

        let savedLocation = new LatLng(location.latitude, location.longitude);
        let myKey = firebase.database().ref('userCoords/' + eventId + '/' + this.userId).push();
        // this.userTrackFirebase.push({[myKey.key]: savedLocation, 'time': new Date().toISOString()});
        this.userTrackFirebase.push({
          [myKey.key]: {
            'lat': location.latitude,
            'lng': location.longitude,
            'time': new Date().toISOString()
          }
        });
        this.userTrack.push(savedLocation);
      });
    }, (err) => {
      console.log(err);
    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();

    // Foreground Tracking
    let options = {
      frequency: 2000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;

        let savedLocation = new LatLng(position.coords.latitude, position.coords.longitude);
        console.log(savedLocation);
        let myKey = firebase.database().ref('userCoords/' + eventId + '/' + this.userId).push();
        // this.userTrackFirebase.push({[myKey.key]: savedLocation, 'time': new Date().toISOString()});
        this.userTrackFirebase.push({
          [myKey.key]: {
            'lat': position.coords.latitude,
            'lng': position.coords.longitude,
            'time': new Date().toISOString()
          }
        });
        this.userTrack.push(savedLocation);
      });
    });
  }

  saveToDatabase(eventId) {
    this.userTrackFirebase.forEach(data => {
      firebase.database().ref('userCoords/' + eventId + '/').child(this.userId).update(data);
    });
  }

  stopTracking(eventId) {
    this.userTrackFirebase.forEach(data => {
      firebase.database().ref('userCoords/' + eventId + '/').child(this.userId).update(data);
    });
    this.backgroundGeolocation.finish();
    this.backgroundGeolocation.stop();
    this.watch.unsubscribe();
    this.storage.set('coordinates', this.userTrackFirebase);
  }

  showRecord() {
    this.storage.get('coordinates').then((val) => {
      this.name = val;
    });
  }
}
