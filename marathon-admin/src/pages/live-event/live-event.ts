import { Component } from '@angular/core';
import { Http } from '@angular/http';

import { ModalController, LoadingController } from 'ionic-angular';
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

import firebase from 'firebase';
import parseTrack from 'parse-gpx/src/parseTrack'
import xml2js from 'xml2js';

import { ParticipantsPage } from '../participants/participants';

@Component({
  selector: 'page-live-event',
  templateUrl: 'live-event.html',
})
export class LiveEventPage {

  public list: any[] = [];
  public gpxData: any;

  eventData: any;
  isListed: boolean = false;
  participants: any = [];
  userPoints: any = [];
  map: GoogleMap;
  loading;


  constructor(private modalCtrl: ModalController, public http: Http, private loadCtrl: LoadingController,
) {
    this.loading = loadCtrl.create({
      content: "Preparing Live Event Map"
    });
    this.loading.present();

    new Promise((resolve, reject) => {
      return firebase.database().ref('events').orderByChild('eventStatus').limitToFirst(1).equalTo('started').on('child_added', snapshot => {
        if (snapshot.val() != null) {
          this.isListed = true;
          this.eventData = {
            id: snapshot.ref.key,
            name: snapshot.val().name,
            time: snapshot.val().time,
            date: snapshot.val().date,
            description: snapshot.val().description,
            location: snapshot.val().location,
            status: snapshot.val().eventStatus
          };
        }
        resolve(this.eventData);
      })
    }).then(event => {
      let data: any = event;
      let eventData = {
        id: data.id,
      };

      firebase.database().ref('userCoords/' + eventData.id).on('child_added', datasnapshot => {
        firebase.database().ref('userCoords/' + eventData.id + '/' + datasnapshot.ref.key).limitToLast(1).on('child_added', coordsnapshot => {
          // this.userPoints.push({
          //   id: datasnapshot.ref.key,
          //   coordinatesId: coordsnapshot.ref.key,
          //   coordinates: coordsnapshot.val()
          // });
          this.userPoints.push(
            coordsnapshot.val()
          );
          console.log(this.userPoints);
        })
      });
    });

    if (this.isListed) {
      firebase.database().ref('participants/' + this.eventData.id).on('child_added', snapshot => {
        if (snapshot) {
          this.participants.push(snapshot.val());
        } else {
          this.participants = [];
        }
      })
    }
  }

  ionViewDidLoad() {
    this.fetchGPX();
  }

  fetchGPX() {
    this.http.get('https://marathon-app-database.firebaseapp.com/makatiRun.gpx').subscribe(data => {
      let dataCoords: any = data;
      let parser = new xml2js.Parser();
      parser.parseString(dataCoords._body, (err, xml) => {
        if (err) {
          console.log(err);
        } else {
          this.gpxData = parseTrack(xml.gpx.trk);
          for (let i = 0; i < this.gpxData.length; i++) {
            let coordinates = { lat: JSON.parse(this.gpxData[i].latitude), lng: JSON.parse(this.gpxData[i].longitude) };
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

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: this.list[0],
        zoom: 16
      },
      controls: {
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
        console.log('Map is ready!');

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

        this.showUser();

        setInterval(() => {
          this.showUser()
        }, 30000); // will add new pin about user whereAbout every 30 seconds

      });
      
  }

  showUser() {
    this.userPoints.forEach(element => {
      // console.log(element);

      this.map.addMarker({
        title: 'Ionic',
        // icon: 'https://cdn0.iconfinder.com/data/icons/world-issues/500/running_man-128.png',
        icon: 'green',
        position: new LatLng(element.lat, element.lng)
      })
    });
  }


  onOpenParticipants() {
    let modal = this.modalCtrl.create(ParticipantsPage, { event: this.eventData, participants: this.participants });
    modal.present();
  }

  getLastPoint() {
  }

}
