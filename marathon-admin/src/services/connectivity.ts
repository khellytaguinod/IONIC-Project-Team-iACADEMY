import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
// import { Platform } from 'ionic-angular';
// import { Subscription } from 'rxjs/Subscription';
 
@Injectable()
export class ConnectivityService {
  // private connected: Subscription;
  // private disconnected: Subscription;
 
  constructor(private network: Network){}
 
  isOnline() {
    return this.network.onConnect();
  }
 
  isOffline() {
    return this.network.onDisconnect();
  }
}
