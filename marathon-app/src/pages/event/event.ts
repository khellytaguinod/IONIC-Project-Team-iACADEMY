import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { MapPage } from '../map/map';

@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  constructor(private navCtrl: NavController) {}

  onViewRoute() {
    this.navCtrl.push(MapPage, {mode: 'view'});
  }

  onJoinEvent() {
    this.navCtrl.push(MapPage, {mode: 'join'});
  }

}
