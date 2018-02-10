import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavParams, NavController, AlertController, ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import firebase from 'firebase';

import { EditEventPage } from '../edit-event/edit-event';
import { LiveEventPage } from '../live-event/live-event';
import { EventsService } from '../../services/events';

declare var google;


@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  eventData: any = {};
  event: string;
  participants: any = [];
  buttonTitle: string;
  anEventStarted: boolean = false;
  default = 'https://cdn.barnimages.com/wp-content/uploads/2017/03/2017-03-27-roman-drits-barnimages-009-768x512.jpg';

  constructor(public navParams: NavParams, public navCtrl: NavController, private actionSheetCtrl: ActionSheetController, private eventsService: EventsService, public alertCtrl: AlertController, public loadCtrl: LoadingController, public toastCtrl: ToastController) {
    this.eventData = this.navParams.get('event');
    firebase.database().ref('participants/' + this.eventData.id).on('child_added', snapshot => {
      if (snapshot) {
        this.participants.push(snapshot.val());
      } else {
        this.participants = [];
      }
    });
    firebase.database().ref('events').on('child_added', snapshot => {
      if (snapshot.val().eventStatus === 'started') {
        this.anEventStarted = true;
      }
    });
    this.buttonTitle = (this.eventData.status === 'started') ? 'live preview' : 'start event';
  }

  ionViewWillEnter() {
    this.event = 'details';
    console.log('course map page');
  }


  ionViewDidEnter() {
    this.loadMap()
    this.showNavigation()
  }

  ionDidLoad(){
    // this.loadMap();
    // this.showNavigation();
  }

  onShowMore() {
    let action = this.actionSheetCtrl.create({
      buttons: [{
        text: 'Edit',
        icon: 'create',
        handler: () => {
          this.navCtrl.push(EditEventPage, { mode: 'edit', data: this.eventData });
        }
      }, {
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.onDelete();
        }
      }]
    });
    action.present();
  }

  onDelete() {
    let alert = this.alertCtrl.create({
      title: 'Delete Event',
      message: 'Are you sure you want to delete this event? This will permanently remove it from the app.',
      buttons: [{
        text: 'Yes',
        handler: () => {
          let load = this.loadCtrl.create({
            content: 'Deleting event...'
          });
          load.present();
          let isDefault = (this.eventData.imgPath == this.default) ? true : false;
          this.eventsService.onDeleteEvent(this.eventData.id, isDefault)
            .then(() => {
              load.dismiss();
              this.navCtrl.popToRoot();
            })
            .catch(err => {
              load.dismiss();
              let toast = this.toastCtrl.create({
                message: 'Cannot delete event. Please try again.',
                duration: 2000
              });
              toast.present();
            })
        }
      }, {
        text: 'No'
      }]
    });
    alert.present();
  }

  onLivePreview() {
    //Check database first if there is a currently live event
    if (this.eventData.status != 'started') {
      //update database of event status = 'started'
    }
    this.navCtrl.setRoot(LiveEventPage);
  }

  loadMap() {
    let latLng = new google.maps.LatLng(12.8797, 121.7740); //PH map coordinates

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

  }

  showNavigation() {

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);

    directionsService.route({
      origin: this.eventData.startPoint,
      destination: this.eventData.endPoint,
      travelMode: google.maps.TravelMode['WALKING']
    }, (res, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(res);
      } else {
        console.warn(status);
      }
    });

  }

}
