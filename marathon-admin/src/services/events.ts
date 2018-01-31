import firebase from 'firebase';

export class EventsService {
  // private events: any = [];

  onLoadEvents() {
  }

  onAddEvent(name: string, description: string, date: string, time: string, location: string) {
    firebase.database().ref('events').push()
    .set({
      name: name,
      description: description,
      date: date,
      time: time,
      location: location,
      eventStatus: 'incoming'
    });
  }

  onEditEvent(id: number) {
  }
}
