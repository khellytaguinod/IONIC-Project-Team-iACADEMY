import firebase from 'firebase';

export class EventsService {

  onAddEvent(name: string, description: string, date: string, time: string, location: string, imgUrl: any, photoTaken: boolean) {
    let eventSubmitted = {};
    let imgPath = '';
    if(photoTaken) {
      let key = firebase.database().ref('events').push().key;
      imgPath = `img/events/${key}.jpg`;
      this.onSaveImg(imgPath, imgUrl);
    }
    eventSubmitted = {
      name: name,
      description: description,
      date: date,
      time: time,
      location: location,
      imgPath: imgPath,
      eventStatus: 'incoming',
    };
    return firebase.database().ref('events').push(eventSubmitted);
  }

  onEditEvent(id: any, eventObj: Object, imgPath: string, imgUrl: any) {
    this.onSaveImg(imgPath, imgUrl);
    return firebase.database().ref('events/' + id).update(eventObj);
  }

  onDeleteEvent(id: any) {
    return firebase.database().ref('events').remove(id);
  }

  onSaveImg(imgPath: string, imgUrl: any) {
    firebase.storage().ref()
    .child(imgPath)
    .putString(imgUrl, firebase.storage.StringFormat.DATA_URL)
    .then(() => {
      console.log('Upload photo successful!');
    })
    .catch(err => {
      console.log(err);
    })
  }
}
