import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  // CameraPosition,
  // MarkerOptions,
  // Marker,
  LatLng
} from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit {
  mode;
  // isViewMode: boolean;
  lat;
  lng;
  map: GoogleMap;

  constructor(private geolocation: Geolocation, private navParams: NavParams) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    // this.isViewMode = (this.mode === 'view') ? true : false;
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = this.roundOff(resp.coords.latitude);
      this.lng = this.roundOff(resp.coords.longitude);

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

  onStart() {
    this.mode = 'start';
  }

  private roundOff(number) {
    let factor = Math.pow(10, 4);
    return Math.round(number * factor) / factor;
  }
}
