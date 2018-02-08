import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-search-point',
  templateUrl: 'search-point.html',
})
export class SearchPointPage {
  point: string;

  autocompleteService: any;
  query: string = '';
  places: any = [];

  constructor(public navParams: NavParams, public viewCtrl: ViewController) {
    this.point = this.navParams.get('point');
  }

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

  selectPlace(test) {
    console.log(test);
    console.log(test.description); // yung isesend firebase 
    // tapos idedecode na lng sa user app

    this.viewCtrl.dismiss();
  }

  onClose() {
    this.viewCtrl.dismiss();
  }

}
