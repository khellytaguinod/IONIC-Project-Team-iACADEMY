import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import firebase from 'firebase';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

import { ParticipantsPage } from '../participants/participants';

@Component({
  selector: 'page-live-event',
  templateUrl: 'live-event.html',
})
export class LiveEventPage {
  eventData;
  isListed: boolean = false;
  participants: any = [];
  map: GoogleMap;


  constructor(private modalCtrl: ModalController) {
    firebase.database().ref('events')
      .orderByChild('eventStatus')
      .limitToFirst(1)
      .equalTo('started').on('child_added', snapshot => {
        if(snapshot.val() != null) {
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
      });
    if(this.isListed) {
      firebase.database().ref('participants/' + this.eventData.id).on('child_added', snapshot => {
        if(snapshot) {
          this.participants.push(snapshot.val());
        } else {
          this.participants = [];
        }
      })
    }
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }, 
      controls: {
        compass: true,
        myLocation: true,
        myLocationButton: true,
        indoorPicker: false,
        zoom: true
      }
    };

    this.map = GoogleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'Ionic',
          // icon: 'https://cdn0.iconfinder.com/data/icons/world-issues/500/running_man-128.png',
          icon: 'green',
          animation: 'DROP',
          position: {
            lat: 43.0741904,
            lng: -89.3809802
          }
        })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }

  onOpenParticipants() {
    let modal = this.modalCtrl.create(ParticipantsPage, {event: this.eventData, participants: this.participants});
    modal.present();
  }

}
