import firebase from 'firebase';

export class EventsService {

  onAddEvent(name: string, description: string, date: string, time: string, startPoint: string, endPoint: string, imgUrl: any, photoTaken: boolean) {
    let eventSubmitted = {};
    if(photoTaken == true) {
      let key = firebase.database().ref('events').push().key;
      let imgPath = `events/${key}.jpg`;
      firebase.storage().ref('img')
      .child(imgPath)
      .putString(imgUrl, firebase.storage.StringFormat.DATA_URL)
      .then(imgData => {
        eventSubmitted = {
          name: name,
          description: description,
          date: date,
          time: time,
          startPoint: startPoint,
          endPoint: endPoint,
          imgPath: imgData.downloadURL,
          eventStatus: 'incoming',
        };
        return firebase.database().ref('events').push(eventSubmitted);
      });
    } else {
      eventSubmitted = {
        name: name,
        description: description,
        date: date,
        time: time,
        startPoint: startPoint,
        endPoint: endPoint,
        imgPath: '',
        eventStatus: 'incoming',
      };
      return firebase.database().ref('events').push(eventSubmitted);
    }
  }

  onEditEvent(id: any, name: string, description: string, date: string, time: string, status: string, startPoint: string, endPoint: string, imgUrl: any, oldImgPath: string, photoTaken: boolean) {
    let eventSubmitted = {};
    let imgPath = `events/${id}.jpg`;
    if(photoTaken) {
      return firebase.storage().ref('img')
      .child(imgPath)
      .putString(imgUrl, firebase.storage.StringFormat.DATA_URL)
      .then(imgData => {
        eventSubmitted = {
          name: name,
          description: description,
          date: date,
          time: time,
          startPoint: startPoint,
          endPoint: endPoint,
          imgPath: imgData.downloadURL,
          eventStatus: status,
        };
        firebase.database().ref('events/' + id).update(eventSubmitted);
      });
    } else {
      eventSubmitted = {
        name: name,
        description: description,
        date: date,
        time: time,
        startPoint: startPoint,
        endPoint: endPoint,
        imgPath: oldImgPath,
        eventStatus: status,
      };
      return firebase.database().ref('events/' + id).update(eventSubmitted);
    }
  }

  onDeleteEvent(id: any, imgDefault: boolean) {
    if(!imgDefault) {
      firebase.storage().ref().child(`img/events/${id}.jpg`).delete()
      .then(() => {
        return firebase.database().ref('events/' + id).remove();
      })
    } else {
      return firebase.database().ref('events/' + id).remove();
    }
  }

  onChangeStatus(id: any, status: string) {
    return firebase.database().ref('events/' + id).update({
      eventStatus: status
    });
  }

  // uploadFile(id, file) {
  //   return firebase.storage().ref('file')
  //   .child(`routes/${id}.gpx`).putString(file)
  //   .then(data => {
  //     firebase.database().ref('events/' + id).update({
  //       route: data.downloadURL
  //     })
  //   })
  // }
}
