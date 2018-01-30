import firebase from 'firebase';
import {Injectable} from "@angular/core";

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
}
