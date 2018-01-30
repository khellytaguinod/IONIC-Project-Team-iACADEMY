import firebase from 'firebase';
import {LoginPage} from "../pages/login/login";
import {Injectable} from "@angular/core";
import {LoadingController, MenuController, NavController} from "ionic-angular";

@Injectable()
export class AuthService {

  constructor(private loadCtrl: LoadingController, private menuCtrl: MenuController, private navCtrl: NavController) {
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password).then(data => {
      firebase.database().ref('users/' + data.uid).once('value').then(snapshot => {
        if (snapshot.val().userType === 'user') {
          const loading = this.loadCtrl.create({
            content: 'You are not an admin.',
          });
          loading.present();
          this.menuCtrl.close();
          setTimeout(() => {
            this.logout();
            this.navCtrl.setRoot(LoginPage);
            loading.dismiss();
          }, 800);
        }
      })
    })
  }

  logout() {
    return firebase.auth().signOut();
  }
}
