import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import firebase from 'firebase';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, LatLng} from '@ionic-native/google-maps';
import {Geolocation} from '@ionic-native/geolocation';

import {MapPage} from '../map/map';
import {ConnectivityService} from '../../services/connectivity';
import {NoConnectionPage} from '../no-connection/no-connection';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  private offline;
  event: any;
  loaded: boolean;
  id;
  date;
  name;
  time;
  status;
  description;
  start;
  end;
  imgPath;
  default = 'https://cdn.barnimages.com/wp-content/uploads/2017/03/2017-03-27-roman-drits-barnimages-009-768x512.jpg';
  map: GoogleMap;

  constructor(private navCtrl: NavController, private geoLocation: Geolocation, private connectivity: ConnectivityService) {
    firebase.database().ref('events/').on('child_added', snapshot => {
      this.event = snapshot.val();
      if (this.event.eventStatus === 'started') {
        this.id = snapshot.ref.key;
        this.date = new Date(this.event.date).toDateString();
        this.name = this.event.name;
        this.time = this.convertTime(this.event.time);
        this.start = this.event.startPoint;
        this.end = this.event.endPoint;
        this.imgPath = this.event.imgPath ? this.event.imgPath : this.default;
        this.status = this.event.eventStatus;
        this.description = this.event.description;
      }
      if (this.id == undefined) {
        this.loaded = false;
      } else {
        this.loaded = true;
      }
    });
  }

  ionViewWillEnter() {
    this.offline = this.connectivity.isOffline().subscribe(data => {
      this.navCtrl.push(NoConnectionPage);
    });
  }

  ionViewWillLeave() {
    this.offline.unsubscribe();
  }

  loadMap() {
    this.geoLocation.getCurrentPosition().then((resp) => {
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
    let user = firebase.auth().currentUser;
    firebase.database().ref('/participants').child(this.id + '/' + user.uid).set({
      joined: true,
      name: user.displayName
    }).catch(error => console.log(error));
    this.navCtrl.push(MapPage, {id: this.id, event: this.name}).catch(err => console.log(err));
  }

  private convertTime(time: string) {
    let H = +time.substr(0, 2);
    let h = (H % 12) || 12;
    let ampm = H < 12 ? "AM" : "PM";
    return h + time.substr(2, 3) + ' ' + ampm;
  }
}
