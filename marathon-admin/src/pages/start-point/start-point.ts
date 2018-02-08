import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-start-point',
  templateUrl: 'start-point.html',
})
export class StartPointPage {
  autocompleteService: any;
  query: string = '';
  places: any = [];
  start;

  constructor(public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    this.autocompleteService = new google.maps.places.AutocompleteService();
  }

  searchPlace() {
    if (this.query.length > 0) {
      let config = {
        input: this.query,
        componentRestrictions: { country: 'PH' }
      }
      this.autocompleteService.getPlacePredictions(config, (predictions, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK && predictions) {
          this.places;
          predictions.forEach((prediction) => {
            this.places.push(prediction);
          });
        }
      });
    } else {
      this.places;
    }
  }

  selectPlace(address) {
    this.start = address.description;
    this.viewCtrl.dismiss({start: this.start});
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
