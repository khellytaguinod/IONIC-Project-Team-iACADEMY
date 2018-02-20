import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';

@Injectable()
export class ConnectivityService {

  constructor(private network: Network){}

  isOnline() {
    return this.network.onConnect();
  }

  isOffline() {
    return this.network.onDisconnect();
  }
}
