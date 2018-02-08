import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse
} from '@ionic-native/background-geolocation';
import 'rxjs/add/operator/filter';

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
import firebase from "firebase";
import { Storage } from '@ionic/storage';

@Injectable()
export class LocationTrackerProvider {


  public list: any[] = [];  // james eto yung array na dapat isaved / push sa db natin
  // public list: any[] = [];  // james eto yung array na dapat isaved / push sa db natin
  public watch: any;
  public lat: number = 0;
  public lng: number = 0;
  public name: string;
  userId = firebase.auth().currentUser.uid;

  constructor(public zone: NgZone,
    private geolocation: Geolocation,
    private backgroundGeolocation: BackgroundGeolocation,
    private storage: Storage) { }

  startTracking(eventId) {
    // Background Tracking
    let config = {
      desiredAccuracy: 0,
      stationaryRadius: 20,
      distanceFilter: 10,
      debug: true,
      interval: 2000
    };

    this.backgroundGeolocation.configure(config).subscribe((location) => {
      console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = location.latitude;
        this.lng = location.longitude;

        let savedLocation = new LatLng(location.latitude, location.longitude)
        this.list.push(savedLocation); // james eto yung array na dapat isaved / push sa db natin
        // console.log(this.list);

        // let myKey = firebase.database().ref('/users/P9Ny6kCN13aVockO1qr7hXYLUsN2/').child('coordinates').push().key;
        // firebase.database().ref('/users/P9Ny6kCN13aVockO1qr7hXYLUsN2/coordinates/' + myKey).update(savedLocation);

      });
    }, (err) => {
      console.log(err);
    });

    // Turn ON the background-geolocation system.
    this.backgroundGeolocation.start();

    // Foreground Tracking
    let options = {
      frequency: 3000,
      enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
      console.log(position);

      let myKey = firebase.database().ref('userCoords/' + eventId + '/' + this.userId).push().key;
      let savedCoordinates = new LatLng(position.coords.latitude, position.coords.longitude);
      firebase.database().ref('userCoords/' + eventId + '/' + this.userId + '/' + myKey).update({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });

      // firebase.database().ref('/users/P9Ny6kCN13aVockO1qr7hXYLUsN2/coordinates/' + myKey).update(savedCoordinates);
      // let savedCoordinates = new LatLng(position.coords.latitude, position.coords.longitude)
      // this.list.push(savedCoordinates); // james eto yung array na dapat isaved / push sa db natin


      // Run update inside of Angular's zone
      this.zone.run(() => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
      });
    });
  }

  stopTracking() {

    console.log('stopTracking');
    this.backgroundGeolocation.finish();
    this.watch.unsubscribe();


    this.storage.set('coordinates', this.list);
    console.log(' coordinates array saved ');

  }

  showRecord() {
      this.storage.get('coordinates').then((val) => {

      this.name = val;
      console.log('coordinates are', val);

    });
  }
}
