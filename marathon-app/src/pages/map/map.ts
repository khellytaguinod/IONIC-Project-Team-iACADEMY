import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import { ModalController, NavParams, Platform, AlertController, NavController } from 'ionic-angular';
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
import { StatsPage } from '../stats/stats';
import { LocationTrackerProvider } from '../../providers/location-tracker/location-tracker';

import parseTrack from 'parse-gpx/src/parseTrack'
import xml2js from 'xml2js';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('rootNavController') nav: NavController;

  public list: any[] = [];
  public gpxData: any;

  name;
  lat;
  lng;
  map: GoogleMap;
  id;

  constructor(
    private geolocation: Geolocation,
    public locationTracker: LocationTrackerProvider,
    private modalCtrl: ModalController, 
    private navParams: NavParams,
    private platform: Platform,
    private alertCtrl: AlertController,
    public http: Http) {
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
    this.fetchGPX();
    this.onStart(this.id);
  }

  fetchGPX() {
    this.http.get('https://marathon-app-database.firebaseapp.com/makatiRun.gpx').subscribe(data => {
      let dataCoords: any = data;
      console.log(dataCoords._body);

      let parser = new xml2js.Parser();
      parser.parseString(dataCoords._body, (err, xml) => {
        if (err) {
          console.log(err);
        } else {
          this.gpxData = parseTrack(xml.gpx.trk);
          for (let i = 0; i < this.gpxData.length; i++) {
            // console.log(track[i].latitude); // 43.512926660478115
            // console.log(track[i].longitude);
            let coordinates = { lat: JSON.parse(this.gpxData[i].latitude), lng: JSON.parse(this.gpxData[i].longitude) };
            this.list.push(coordinates);
          }
          console.log(this.list);
          // this.loadMap();

          setTimeout(() => {
            this.loadMap();
          }, 5000);
        }
      });
    });
  }


  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: this.list[0],
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

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {

        this.map.addPolyline({
          points: this.list,
          'color': '#8342f4',
          'width': 7,
          'geodesic': false,
          'clickable': false // default = false
        })

        this.map.addMarker({
          'position': this.list[0],
          'iconData': "https://marathon-app-database.firebaseapp.com/start.png"
        });

        this.map.addMarker({
          'position': this.list.pop(),
          'iconData': "https://marathon-app-database.firebaseapp.com/end.png"

        });

      }).catch((err) => {
        alert('error loading course map')
        console.log('Error setting up', err);
      });

    setInterval(() => {
      console.log('adding user past tracks');
      this.addCurrentTrack();
    }, 4000); // will draw th users track every 4 seconds

  }

  addCurrentTrack() {
    let userTracks: any[] = [];

    const subscription = this.geolocation.watchPosition()
      .filter((p) => p.coords !== undefined) //Filter Out Errors
      .subscribe(position => {
        console.log(position.coords.longitude + ' ' + position.coords.latitude);
        userTracks.push({ lat: position.coords.longitude, lng: position.coords.latitude })

        this.map.addPolyline({
          points: userTracks,
          'color': '#29d855',
          'width': 6,
          'geodesic': false,
          'clickable': false // default = false
        })
        console.log(userTracks);
      });
  }

  onStart(eventId) {
    this.locationTracker.startTracking(eventId);
  }

  onOpenStats() {
    let modal = this.modalCtrl.create(StatsPage);
    modal.present();
  }

  private roundOff(number) {
    let factor = Math.pow(10, 4);
    return Math.round(number * factor) / factor;
  }
}
