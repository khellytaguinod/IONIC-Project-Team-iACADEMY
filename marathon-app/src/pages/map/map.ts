import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from 'ionic-angular';
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
import { StatsPage } from '../stats/stats';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage implements OnInit {
  mode;
  lat;
  lng;
  map: GoogleMap;

  constructor(private geolocation: Geolocation, 
              private navParams: NavParams, 
              public locationTracker: LocationTrackerProvider,
              private modalCtrl: ModalController) {}

  ngOnInit() {
    this.mode = this.navParams.get('mode');
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
    this.locationTracker.startTracking();
  }

  onOpenStats() {
    let modal = this.modalCtrl.create(StatsPage, {}, {cssClass: 'statsModal'});
    modal.present();
  }

  private roundOff(number) {
    let factor = Math.pow(10, 4);
    return Math.round(number * factor) / factor;
  }
}
