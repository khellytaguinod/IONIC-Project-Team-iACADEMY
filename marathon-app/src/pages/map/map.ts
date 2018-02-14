import {Component, ViewChild} from '@angular/core';
import {ModalController, NavParams, Platform, AlertController, NavController} from 'ionic-angular';
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
  @ViewChild('rootNavController') nav: NavController;
  name;
  lat;
  lng;
  map: GoogleMap;
  id;

  constructor(private geolocation: Geolocation,
              public locationTracker: LocationTrackerProvider,
              private modalCtrl: ModalController, private navParams: NavParams,
              private platform: Platform,
              private alertCtrl: AlertController) {
    this.platform.registerBackButtonAction(() => {
      let alert = this.alertCtrl.create({
        title: 'Are you sure you want to quit?',
        buttons: [{
          text: 'Yes',
          handler: () => {
            this.nav.popToRoot();
          }
        }, {
          text: 'No',
          role: 'cancel'
        }]
      });
      alert.present();
    });
    this.id = this.navParams.get('id');
    this.name = this.navParams.get('event');
  }

  ionViewDidLoad() {
    this.loadMap();
    this.onStart(this.id);

    setInterval(() => {
      console.log('adding user past tracks');
      this.drawUserTrack();
    }, 20000); // will draw userTracks every 1 minutes 
  }

  loadMap() {

    let tempRoute = [
      {
        "lat": 14.559130000000001,
        "lng": 121.01941000000001
      },
      {
        "lat": 14.5584,
        "lng": 121.01894000000001
      },
      {
        "lat": 14.558190000000002,
        "lng": 121.01925000000001
      },
      {
        "lat": 14.55713,
        "lng": 121.02091000000001
      },
      {
        "lat": 14.557150000000002,
        "lng": 121.02095000000001
      },
      {
        "lat": 14.557150000000002,
        "lng": 121.02101
      },
      {
        "lat": 14.556920000000002,
        "lng": 121.02141
      },
      {
        "lat": 14.55667,
        "lng": 121.02182
      },
      {
        "lat": 14.556440000000002,
        "lng": 121.02211000000001
      },
      {
        "lat": 14.556350000000002,
        "lng": 121.02211000000001
      },
      {
        "lat": 14.555740000000002,
        "lng": 121.02300000000001
      }
    ]

    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = this.roundOff(resp.coords.latitude);
      this.lng = this.roundOff(resp.coords.longitude);

      let location = new LatLng(resp.coords.latitude, resp.coords.longitude);

      let mapOptions: GoogleMapOptions = {
        camera: {
          target: tempRoute[0],
          zoom: 16
          // tilt: 30
        },
        controls: {
          compass: true,
          myLocation: true,
          myLocationButton: true,
          indoorPicker: false,
          zoom: true
        },
        preferences: {
          building: false
        }
      };

      this.map = GoogleMaps.create('map_canvas', mapOptions);
      this.map.one(GoogleMapsEvent.MAP_READY)
        .then(() => {
          
          this.map.addPolyline({
            points: tempRoute,
            'color': '#8342f4',
            'width': 7,
            'geodesic': false,
            'clickable': false // default = false
          })

        });
    }).catch((error) => {
      alert('error loading course map')
      console.log('Error getting location', error);
    });
  }

  onStart(eventId) {
    this.locationTracker.startTracking(eventId);
  }

  drawUserTrack() {
    this.map.addPolyline({
      points: this.locationTracker.userTrack,
      'color': '#2db262',
      'width': 8,
      'geodesic': false,
      'clickable': false // default = false
    })
  }

  // onPause() {
  //   this.locationTracker.stopTracking();
  // }

  onOpenStats() {
    let modal = this.modalCtrl.create(StatsPage);
    modal.present();
  }

  private roundOff(number) {
    let factor = Math.pow(10, 4);
    return Math.round(number * factor) / factor;
  }
}
