import firebase from 'firebase';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return firebase.auth().signOut();
  }

  getCurrentUser() {
    return firebase.auth().currentUser;
  }

  editUserName(displayName: string, photoUrl: string = '') {
    let admin = this.getCurrentUser();
    if(admin) {
      admin.updateProfile({
        displayName: displayName,
        photoURL: photoUrl
      })
    }
    return firebase.database().ref('/users').child(admin.uid + '/profile').update({
      name: displayName
    });
  }

  editUserEmail(email: string) {
    let admin = this.getCurrentUser();
    admin.updateEmail(email);
    return firebase.database().ref('/users').child(admin.uid + '/profile').update({
      email: email
    })
  }

  changePassword(password: string) {
    let admin = this.getCurrentUser();
    return admin.updatePassword(password);
  }

  reauthenticateUser(email: string, password: string) {
    let admin = this.getCurrentUser();
    let credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return admin.reauthenticateWithCredential(credential);
  }
}
