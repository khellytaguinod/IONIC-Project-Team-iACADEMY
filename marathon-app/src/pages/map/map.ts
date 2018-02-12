import {Component} from '@angular/core';
import {ModalController, NavParams} from 'ionic-angular';
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
import {Geolocation} from '@ionic-native/geolocation';
import {StatsPage} from '../stats/stats';
import {LocationTrackerProvider} from '../../providers/location-tracker/location-tracker';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  name;
  lat;
  lng;
  map: GoogleMap;
  id;

  constructor(private geolocation: Geolocation,
              public locationTracker: LocationTrackerProvider,
              private modalCtrl: ModalController, private navParams: NavParams) {
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('event');
  }

  ionViewDidLoad() {
    this.loadMap();
    this.onStart(this.id);
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
          myLocation: true, // go to controls definition then add a myLocation property and boolean modified by khelly 
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

  onStart(eventId) {
    this.locationTracker.startTracking(eventId);
  }

  // onPause() {
  //   this.locationTracker.stopTracking();
  // }

  onOpenStats() {
    // let modal = this.modalCtrl.create(StatsPage, {}, {cssClass: 'statsModal'});
    let modal = this.modalCtrl.create(StatsPage);
    modal.present();
  }

  private roundOff(number) {
    let factor = Math.pow(10, 4);
    return Math.round(number * factor) / factor;
  }
}
