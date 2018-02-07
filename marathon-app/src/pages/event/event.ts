import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
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
  buttonIcon: string = 'add';
  buttonColor: string = 'danger';
  joined: boolean = false;
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

  constructor(private navCtrl: NavController, private geolocation: Geolocation, private loadCtrl: LoadingController) {
    firebase.database().ref('events/').on('child_added', snapshot => {
      this.event = snapshot.val();
      if (this.event.eventStatus === 'started') {
        this.id = snapshot.ref.key;
        this.date = new Date(this.event.date).toDateString();
        this.name = this.event.name;
        this.time = this.convertTime(this.event.time);
        this.location = this.event.location;
        this.status = this.event.eventStatus;
        this.description = this.event.description;
      } else if (this.event.eventStatus === 'incoming') {
        this.id = snapshot.ref.key;
        this.date = new Date(this.event.date).toDateString();
        this.name = this.event.name;
        this.time = this.convertTime(this.event.time);
        this.location = this.event.location;
        this.status = this.event.eventStatus;
        this.description = this.event.description;
      }
    });
    let loading = this.loadCtrl.create({});
    loading.present();
    setTimeout(() => {
      let userId = firebase.auth().currentUser.uid;
      firebase.database().ref('participants/' + this.id).once('value').then(snapshot => {
        if (snapshot.hasChild(userId)) {
          firebase.database().ref('participants/' + this.id).child(userId).once('value', dataSnapshot => {
            this.joined = dataSnapshot.val().joined;
            if (this.joined) {
              this.buttonIcon = "checkmark";
              this.buttonColor = 'default';
              loading.dismiss();
            } else {
              this.buttonIcon = "add";
              this.buttonColor = 'danger';
              loading.dismiss();
            }
          });
        } else {
          this.joined = false;
          this.buttonIcon = "add";
          this.buttonColor = 'danger';
          loading.dismiss();
        }
      });
    }, 2000);
  }

  onViewRoute() {
    this.navCtrl.push(MapPage, {mode: 'view'}).catch(error => {
      console.log(error);
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
      this.buttonColor = 'secondary';
      this.joined = true;
      firebase.database().ref('/participants').child(this.id + '/' + user.uid).set({
        joined: true,
        name: user.displayName
      }).catch(error => console.log(error));
    } else if (this.buttonIcon === 'checkmark') {
      this.buttonIcon = "add";
      this.buttonColor = 'danger';
      this.joined = false;
      firebase.database().ref('/participants').child(this.id + '/' + user.uid).update({
        joined: false,
      }).catch(error => console.log(error));
    } else if (this.buttonIcon === 'checkmark' && this.status === 'started') {
      this.buttonIcon = "play";
      this.buttonColor = 'secondary';
      this.navCtrl.push(MapPage, {mode: 'join'}).catch(error => console.log(error));
    }
  }

  private convertTime(time: string) {
    let H = +time.substr(0, 2);
    let h = (H % 12) || 12;
    let ampm = H < 12 ? "AM" : "PM";
    return h + time.substr(2, 3) + ' ' + ampm;
  }
}
