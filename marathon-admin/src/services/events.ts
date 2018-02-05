import firebase from 'firebase';

export class EventsService {
  onAddEvent(eventObj: Object) {
    return firebase.database().ref('events').push(eventObj);
  }

  onEditEvent(id: any, eventObj: Object) {
    return firebase.database().ref('events/' + id).update(eventObj);
  }

  onDeleteEvent(id: any) {
    return firebase.database().ref('events').remove(id);
  }
}
