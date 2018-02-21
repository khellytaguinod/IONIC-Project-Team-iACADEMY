import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController, NavController } from 'ionic-angular';
import * as firebase from "firebase/app";

import { NoConnectionPage } from '../no-connection/no-connection';
import { ConnectivityService } from '../../services/connectivity';

@Component({
  selector: 'page-participants',
  templateUrl: 'participants.html',
})
export class ParticipantsPage implements OnInit {
  private offline;
  eventData;
  participants;
  xml: string;
  xmlLoop: string;
  coords = [];

  constructor(public navParams: NavParams, public viewCtrl: ViewController, private navCtrl: NavController, private connectivity: ConnectivityService) {}

  ngOnInit() {
    this.eventData = this.navParams.get('event');
    this.participants = this.navParams.get('participants');
  }

  ionViewWillEnter() {
    this.offline = this.connectivity.isOffline().subscribe(data => {
      console.log(data);
      this.navCtrl.push(NoConnectionPage);
    });
  }

  ionViewWillLeave() {
    this.offline.unsubscribe();
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

  onFetchData(userId) {
    new Promise((res,rej) => {
      return firebase.database().ref('userCoords/' + this.eventData.id).child(userId).on('child_added', snapshot => {
        if(snapshot) {
          this.coords.push(snapshot.val());
        }
        res(this.coords);
      });
    }).then(data => {
      let pointArr = data.map(point => {
          return `<trkpt lat="${point.lat}" lon="${point.lng}">
  <time>${point.time}</time>
</trkpt>`;
      });
      this.xmlLoop = pointArr.reduce((aggregate, data) => aggregate + data);
      this.xml = `<?xml version="1.0"?>
<gpx version="1.0">
  <trk>
    <trkseg>
    ${this.xmlLoop}
    </trkseg>
  </trk>
</gpx>`;
      let parser = new DOMParser();
      let parsedXml = parser.parseFromString(this.xml, "application/xml");
      console.log(parsedXml);
    })
  }
}
