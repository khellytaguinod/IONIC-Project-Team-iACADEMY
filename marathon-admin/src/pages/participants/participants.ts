import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController, NavController } from 'ionic-angular';
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

}
