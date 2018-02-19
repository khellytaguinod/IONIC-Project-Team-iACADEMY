import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import firebase from 'firebase';

import { ParticipantsPage } from '../participants/participants';

@Component({
  selector: 'page-live-event',
  templateUrl: 'live-event.html',
})
export class LiveEventPage {
  eventData: any;
  isListed: boolean = false;
  participants: any = [];
  userPoints: any = [];
  map: GoogleMap;

  constructor(private modalCtrl: ModalController) {
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
        firebase.database().ref('userCoords/' + eventData.id + '/' + datasnapshot.ref.key).child('coordinates').limitToLast(1).on('child_added', coordsnapshot => {
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
    setTimeout(() => {
      this.loadMap();
    }, 3000);
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 10,
        // tilt: 30
      },
      controls: {
        // compass: true,
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
        console.log('Map is ready!');

        setInterval(() => {
          this.showUser()
        }, 30000); // will add new pin about user whereabout every 30 seconds

      });
  }

  showUser() {
    this.userPoints.forEach(element => {
      // console.log(element);

      this.map.addMarker({
        title: 'Ionic',
        // icon: 'https://cdn0.iconfinder.com/data/icons/world-issues/500/running_man-128.png',
        icon: 'green',
        // animation: 'DROP',
        position: element
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
