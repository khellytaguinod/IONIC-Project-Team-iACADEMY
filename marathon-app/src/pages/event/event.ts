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
import {Geolocation} from '@ionic-native/geolocation';

import {MapPage} from '../map/map';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  buttonIcon: string;
  buttonColor: string;
  joined: boolean;
  event: any = {};
  id;
  item: string;
  date;
  name;
  time;
  status;
  location;
  description;
  map: GoogleMap;

  constructor(private navCtrl: NavController, private geolocation: Geolocation) {
    firebase.database().ref('events/').on('child_added', snapshot => {
      this.event = snapshot.val();
      if (this.event.eventStatus === 'started') {
        this.id = snapshot.ref.key;
        this.date = this.event.date;
        this.name = this.event.name;
        this.time = this.event.time;
        this.location = this.event.location;
        this.status = this.event.eventStatus;
        this.description = this.event.description;
      } else if (this.event.eventStatus === 'incoming') {
        this.id = snapshot.ref.key;
        this.date = this.event.date;
        this.name = this.event.name;
        this.time = this.event.time;
        this.location = this.event.location;
        this.status = this.event.eventStatus;
        this.description = this.event.description;
      }
    });
  }

  onViewRoute() {
    this.navCtrl.push(MapPage, {mode: 'view'}).catch(error => {
      console.log(error);
    });
  }

  verifyJoinStatus(id: string) {
    let userId = firebase.auth().currentUser.uid;
    firebase.database().ref('participants/' + id).once('value').then(snapshot => {
      if (snapshot.hasChild(userId)) {
        console.log(snapshot.val());
        // this.joined = false;
        // this.butt  onIcon = "add";
        // this.buttonColor = 'danger';
      } else {
        firebase.database().ref('participants/' + id).child(userId).once('value', dataSnapshot => {
          console.log(dataSnapshot.val());
          // this.joined = dataSnapshot.val().joined;
          // if (this.joined) {
          //   this.buttonIcon = "checkmark";
          //   this.buttonColor = 'default';
          // } else {
          //   this.buttonIcon = "add";
          //   this.buttonColor = 'danger';
          // }
        });
      }
    });
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

  onUserEventStatus() {
    let user = firebase.auth().currentUser;
    if (this.buttonIcon === 'add') {
      this.buttonIcon = "checkmark";
      this.buttonColor = 'default';
      firebase.database().ref('/participants').child(this.id + '/' + user.uid).set({
        joined: true,
        name: user.displayName
      }).catch(error => console.log(error));
    } else if (this.buttonIcon === 'checkmark') {
      this.buttonIcon = "add";
      this.buttonColor = 'danger';
      firebase.database().ref('/participants').child(this.id + '/' + user.uid).update({
        joined: false,
      }).catch(error => console.log(error));
    } else if (this.buttonIcon === 'checkmark' && this.status === 'started') {
      this.buttonIcon = "play";
      this.buttonColor = 'secondary';
      this.navCtrl.push(MapPage, {mode: 'join'}).catch(error => console.log(error));
    }
  }
}
