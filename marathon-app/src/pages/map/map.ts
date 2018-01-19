import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
import { Geolocation } from '@ionic-native/geolocation';


/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map: GoogleMap;

  constructor(public navCtrl: NavController, private geolocation: Geolocation) {}

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      let location = new LatLng(resp.coords.latitude, resp.coords.longitude)

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
}
