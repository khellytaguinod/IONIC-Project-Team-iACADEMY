import firebase from 'firebase';

export class EventsService {

  onAddEvent(name: string, description: string, date: string, time: string, location: string, imgUrl: any, photoTaken: boolean) {
    let eventSubmitted = {};
    let key = firebase.database().ref('events').push().key;
    let imgPath = photoTaken ? `events/${key}.jpg` : '';
    return firebase.storage().ref('img')
    .child(imgPath)
    .putString(imgUrl, firebase.storage.StringFormat.DATA_URL)
    .then(imgData => {
      eventSubmitted = {
        name: name,
        description: description,
        date: date,
        time: time,
        location: location,
        imgPath: imgData.downloadURL,
        eventStatus: 'incoming',
      };
      firebase.database().ref('events').push(eventSubmitted);
    });
  }

  onEditEvent(id: any, name: string, description: string, date: string, time: string, location: string, imgUrl: any, photoTaken: boolean) {
    let eventSubmitted = {};
    let imgPath = photoTaken ? `events/${id}.jpg` : '';
    return firebase.storage().ref('img')
    .child(imgPath)
    .putString(imgUrl, firebase.storage.StringFormat.DATA_URL)
    .then(imgData => {
      eventSubmitted = {
        name: name,
        description: description,
        date: date,
        time: time,
        location: location,
        imgPath: imgData.downloadURL,
        eventStatus: 'incoming',
      };
      firebase.database().ref('events/' + id).update(eventSubmitted);
    });
  }

  onDeleteEvent(id: any) {
    return firebase.database().ref('events').remove(id);
  }
}
