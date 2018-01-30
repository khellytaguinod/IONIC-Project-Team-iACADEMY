import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import firebase from 'firebase';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  LatLng
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

import {MapPage} from '../map/map';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  item: string;
  date;
  name;
  description;
  location;
  status;
  time;
  event: any = {};
  map: GoogleMap;

  constructor(private navCtrl: NavController, private geolocation: Geolocation) {
    firebase.database().ref('events/').on('child_added', snapshot => {
      this.event = snapshot.val();
      if (this.event.eventStatus === 'started') {
        this.date = this.event.date;
        this.name = this.event.name;
        this.time = this.event.time;
        this.location = this.event.location;
        this.description = this.event.description;
      } else if (this.event.eventStatus === 'incoming') {
        this.date = this.event.date;
        this.name = this.event.name;
        this.time = this.event.time;
        this.location = this.event.location;
        this.description = this.event.description;
      }
    })
  }

  ionViewWillEnter() {
    this.item = 'details';
  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {
      let location = new LatLng(resp.coords.latitude, resp.coords.longitude);

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: location,
          zoom: 16
          // tilt: 30
        },
        controls: {
          compass: true,
          myLocationButton: true,
          indoorPicker: true,
          zoom: true
        }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          console.log('Map is ready!');
        });
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  onStartRun() {
    this.navCtrl.push(MapPage);
  }

}
